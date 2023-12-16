import { useMemo, useState } from "react"

export enum US_STATE {
  CA = 'CA',
  NY = 'NY',
  TX = 'TX',
  FL = 'FL',
  WA = 'WA',
  OR = 'OR',
  CO = 'CO',
  IL = 'IL',
  PA = 'PA',
  MA = 'MA',
  GA = 'GA',
  MI = 'MI',
  OH = 'OH',
  NC = 'NC',
  NJ = 'NJ',
  VA = 'VA',
  AZ = 'AZ',
  TN = 'TN',
  IN = 'IN',
  MD = 'MD',
  MO = 'MO',
  MN = 'MN',
  WI = 'WI',
  UT = 'UT',
  SC = 'SC',
  AL = 'AL',
  LA = 'LA',
  KY = 'KY',
  OK = 'OK',
  CT = 'CT',
  IA = 'IA',
  AR = 'AR',
  NV = 'NV',
  KS = 'KS',
  MS = 'MS',
  NM = 'NM',
  NE = 'NE',
  WV = 'WV',
  ID = 'ID',
  HI = 'HI',
  NH = 'NH',
  ME = 'ME',
  MT = 'MT',
  RI = 'RI',
  DE = 'DE',
  SD = 'SD',
  ND = 'ND',
  AK = 'AK',
  VT = 'VT',
  WY = 'WY',
}

export const US_STATE_OPTIONS = Object.values(US_STATE).map((state) => ({
  label: state,
  value: state,
}))

// Manages state of address field
export const useAddress = () => {
  const [address1, setAddress1] = useState<string>('')
  const [address2, setAddress2] = useState<string>('')
  const [city, setCity] = useState<string>('')
  const [state, setState] = useState<US_STATE>(US_STATE.CA)
  const [zip, setZip] = useState<string>('')

  const isValid = useMemo(() => {
    if(!address1 || !city && !zip) {
      return false
    }

    if(!state || !Object.values(US_STATE).includes(state)) {
      return false
    }

    if(!zip || !zip.match(/^\d{5}$/)) {
      return false
    }

    return true
  }, [address1, address2, city, state, zip])

  return {
    address1,
    setAddress1,
    address2,
    setAddress2,
    city,
    setCity,
    state,
    setState,
    zip,
    setZip,
    isValid,
  }
}