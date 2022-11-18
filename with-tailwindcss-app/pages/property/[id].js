
import { useRouter } from 'next/router'

export default function Post({postData}) {

    

  return (
    <div>
      <p>po</p>
      <h1>{postData.description}</h1>
    </div>
  )
}




export async function getStaticPaths(){
  const searchResults = await fetch("https://www.jsonkeeper.com/b/5NPS").then((res) => res.json())
  var myarray = [];

  searchResults.map(i => myarray.push({params: {id: i.title}}))


  return{
    paths: myarray,
    fallback: true
  }
}

export async function getStaticProps({params}) {
  const searchResults = await fetch("https://www.jsonkeeper.com/b/5NPS").then((res) => res.json())
        
  const itemData = searchResults.filter(item => item.title == params.id)
  return{
    props: {
     postData: itemData
    }
  }
}
