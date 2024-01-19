import type { NextApiRequest, NextApiResponse } from 'next'

const DATA_SOURCE_URL = "https://jsonplaceholder.typicode.com/todos"

// export async function GET() {
//     const res = await fetch(DATA_SOURCE_URL)
//     const todos: Todo[] = await res.json()

//     return NextApiResponse.json(todos)
// }

const GET = async (request: NextApiRequest, response: NextApiResponse) => {
    const res = await fetch(DATA_SOURCE_URL)
    const todos: Todo[] = await res.json()
  
    response.status(200).json(todos)
  }

  export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    if (req.method === 'GET') {
      await GET(req, res)
    }
  }

  export async function DELETE(request: NextApiRequest) {
    const {id}: Partial<Todo> = await request.json()
    if(!id) return NextApiResponse.json({"message":"Todo id required"})
    
    await fetch()
  }