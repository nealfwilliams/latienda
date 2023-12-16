// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import {FunctionsClient} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/FunctionsClient.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./FunctionsConsumerExample.sol";

contract Payment2 is  Ownable{
    mapping (address => bool) public allowedTokenAddress;
    mapping (address => uint256) public amountPaidByAddress;
    
    event tokenContractAllowed(address _address, bool _bool);
    event paymentSuccessful(address _from, address _to, uint256 _amount);

    constructor(address owner,  address router) Ownable(owner) {
        //address router;
    } 

       using FunctionsRequest for FunctionsRequest.Request;

    bytes32 public s_lastRequestId;
    //bytes32 private amountRequested;
    
 struct InputData {
   bytes32 amountRequested;
 }

InputData ip;

function assignInputData(
 bytes32 amountRequested
   ) public {
   ip.amountRequested = amountRequested;
 }
    error UnexpectedRequestID(bytes32 requestId);

    event Response(bytes32 indexed requestId, bytes response, bytes err);

    /**
     * @notice Send a simple request
     * @param source JavaScript source code
     * @param encryptedSecretsUrls Encrypted URLs where to fetch user secrets
     * @param donHostedSecretsSlotID Don hosted secrets slotId
     * @param donHostedSecretsVersion Don hosted secrets version
     * @param args List of arguments accessible from within the source code
     * @param bytesArgs Array of bytes arguments, represented as hex strings
     * @param subscriptionId Billing ID
     */
    function sendRequest(
        string memory source,
        bytes memory encryptedSecretsUrls,
        uint8 donHostedSecretsSlotID,
        uint64 donHostedSecretsVersion,
        string[] memory args,
        bytes[] memory bytesArgs,
        uint64 subscriptionId,
        uint32 gasLimit,
        bytes32 donID
    ) private returns (bytes32 requestId) {
        FunctionsRequest.Request memory req;
        req.initializeRequestForInlineJavaScript(source);
        if (encryptedSecretsUrls.length > 0)
            req.addSecretsReference(encryptedSecretsUrls);
        else if (donHostedSecretsVersion > 0) {
            req.addDONHostedSecrets(
                donHostedSecretsSlotID,
                donHostedSecretsVersion
            );
        }
        if (args.length > 0) req.setArgs(args);

        return s_lastRequestId;
    }

    function allowedStableCoinAddress(address _token, bool _isAllowed) public onlyOwner {
        allowedTokenAddress[_token] = _isAllowed;
        emit tokenContractAllowed(_token, _isAllowed);
    }

    function depositPaymentWithTracking(address _token, uint256 _amount,
        string memory source,
        bytes memory encryptedSecretsUrls,
        uint8 donHostedSecretsSlotID,
        uint64 donHostedSecretsVersion,
        string[] memory args,
        bytes[] memory bytesArgs,
        uint64 subscriptionId,
        uint32 gasLimit,
        bytes32 donID) public returns(bytes32){
        require(allowedTokenAddress[_token] == true, "This stable coin is not allowed");
        require(IERC20(_token).allowance(msg.sender, address(this)) >=  _amount, "This contract is not allowed to withdraw from this token address");
        bool success = IERC20(_token).transferFrom(msg.sender, address(this), _amount);
        require(success, "Failed to deposit payment");
        amountPaidByAddress[msg.sender] += _amount;
        emit paymentSuccessful(msg.sender, address(this), _amount);
        return sendRequest(source, encryptedSecretsUrls, donHostedSecretsSlotID, donHostedSecretsVersion, args, bytesArgs, subscriptionId, gasLimit, donID);
    }

    function withdraw(address _token, 
        uint256 _amount, 
        string memory source,
        bytes memory encryptedSecretsUrls,
        uint8 donHostedSecretsSlotID,
        uint64 donHostedSecretsVersion,
        string[] memory args,
        bytes[] memory bytesArgs,
        uint64 subscriptionId,
        uint32 gasLimit,
        bytes32 donID
        ) public returns(bytes32){
        bytes32 requestSent = sendRequest(source,encryptedSecretsUrls,donHostedSecretsSlotID,donHostedSecretsVersion,args,bytesArgs,subscriptionId,gasLimit,donID);
        require(requestSent == ip.amountRequested);
        bool success = IERC20(_token).transfer(msg.sender, _amount);
        require(success, "Failed to withdraw payment");
        amountPaidByAddress[msg.sender] += _amount;
        return sendRequest(
        source, 
        encryptedSecretsUrls,
        donHostedSecretsSlotID,
        donHostedSecretsVersion,
        args,
        bytesArgs,
        subscriptionId,
        gasLimit,
        donID);
    }



    receive() external payable {}
    fallback() external payable {}



}