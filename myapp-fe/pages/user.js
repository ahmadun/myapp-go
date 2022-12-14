import Head from 'next/head'
import axios from "axios";


export async function getServerSideProps() {

  const req = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/users`)
  const res = await req.data.data.data
  return {
    props: {
      users: res
    },
  }
}

const deleteuser = async (id)=>{
  await axios.delete(`${process.env.NEXT_PUBLIC_API_BACKEND}/user/${id}`).then((res) => {
    console.log(res)
  }).catch(error => console.error(`Error:${error}`));
  
}



export default function index(props) {
  const { users } = props;

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main >
        <table className="table table-bordered mb-0">
          <thead>
            <tr>
              <th scope="col">IMAGE</th>
              <th scope="col">JUDUL</th>
              <th scope="col">CONTENT</th>
              <th scope="col">AKSI</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.location}</td>
                <td>{item.title}</td>
                <td className="text-center">
                  <button  className="btn btn-sm btn-primary border-0 shadow-sm mb-3 me-3">EDIT</button>
                  <button onClick={() => deleteuser(item.id)} className="btn btn-sm btn-danger border-0 shadow-sm mb-3">DELETE</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </main>


    </div>
  )
}
