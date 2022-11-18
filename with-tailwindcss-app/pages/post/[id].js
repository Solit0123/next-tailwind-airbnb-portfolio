import React from 'react'
import Header from '../../components/Header';
import InfoCard from '../../components/infoCard';


export default function Post({myarray}) {
    
  
  return (
    <div>
        <Header/>
        <h1>This is a post</h1>
        <h2>{myarray[0].title}</h2>

        <section>
            <div className="container mx-auto">
            <InfoCard key={myarray[0].img} img={myarray[0].img} location={myarray[0].location} title={myarray[0].title} description={myarray[0].description} star={myarray[0].star} price={myarray[0].price} total={myarray[0].total}/> 
            </div>
        </section>
    </div>
  )
};

export async function getStaticPaths(){
    const searchResults = await fetch("https://www.jsonkeeper.com/b/5NPS").then((res) => res.json())
    var myarray = [];
  
    searchResults.map(i => myarray.push({params: {id: i.title}}))
  
  
    return{
      paths: myarray,
      fallback: false
    }
  }

export async function getStaticProps({params}){
    const searchResults = await fetch("https://www.jsonkeeper.com/b/5NPS").then((res) => res.json())
    var myarray = [];
    searchResults.map((i) => { if(i.title == params.id) {myarray.push(i)} })
  

    return{
        props: {
                myarray
        }
    }
}