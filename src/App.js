import React, {
  useState,
  useEffect
} from 'react';
import './App.css';
import {Box} from '@material-ui/core';
import CreateBlogArray from './components/blogarray/blogarray';
import SideBar from './components/material-sidebar/sidebar';
import Spinner from './components/material-spinner/spinner';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import IconButton from '@material-ui/core/IconButton';

function App() {

  const contentful = require('contentful')
  const [apiData, setApiData] = useState()
  const [arrCount, setArrCount] = useState(0);
  const [topData, setTopData] = useState();
  const [selected, setSelected] = useState(false);
  const [allData, setAllData] = useState();
  const [contentMsg, setContentMsg] = useState()
  const [currentTitle, setTitle] = useState();


  const scrollOptions = {
    left: 0,
    top: 0,
    behavior: 'smooth',
  }
  
  // set up search queries.
  const id = "entries";
  const token = process.env.REACT_APP_API_KEY;
  const client = contentful.createClient({
    space: 'ahavbgs7z0ax',
    accessToken: token
  })

  useEffect(() => {
    getLatestTopPosts(id, client);
    fetchContent(id, client, arrCount);
  }, [])
    
  // Create fetch with contentful client.
  const fetchContent = async (id, client, skipCount, selected) => {  
    
    if (selected){
      client.getEntries({
        content_type: 'blog',
        query: selected,
        limit:"1"
      })
      .then((response) => setApiData(response))
      .catch(console.error)
    }

    else{
      client.getEntries({
        content_type: 'blog',
        skip: skipCount.toString(),
        limit:"5",
      })
      .then((response) => setApiData(response))
      .then(() => setArrCount(arrCount+5))
      .catch(console.error)
    }
  }
  
  const getLatestTopPosts = async (id, client ) => {
    client.getEntries({
      content_type: 'blog',
      limit:"5",
    })
    .then((response) => setTopData(response))
    .catch(console.error)
  }

  const fetchAllData = async (id, client) => {
    client.getEntries({
      content_type: 'blog',
      limit:"100",
    })
    .then((response) => setAllData(response))
    .catch(console.error)
  }
  
  const showSelected = (selected_name) => {
    fetchContent(id, client, 0, selected_name.toString());
    window.scrollTo(scrollOptions);  
    setSelected(true);
  }

  const getAllData = async () => {
      fetchAllData(id, client)
  } 
  
    const refreshContent = async () => {
      console.log("Fetching new content and updating")
      fetchContent(id, client, arrCount);    
  }

  const goBacktoTop = () => {
    window.scrollTo(scrollOptions);  
  }
  
  // If apidata is present, create react component from rich text
  if (apiData && topData) {
    console.log(apiData)
      if (apiData.items.length === 0){
        console.log("no more new content")
        if (!contentMsg){
            setContentMsg(<IconButton children={<ArrowUpwardIcon />} onClick={() => goBacktoTop()}></IconButton>)
        }
      }
    return ( 
      <>
      <CreateBlogArray currentTitle={currentTitle} setTitle={setTitle} contentMsg={contentMsg} selected={selected} apiData={apiData} refreshContent={refreshContent}/>
      <SideBar currentTitle={currentTitle} setSelected={setSelected} getAllData={getAllData} allArray={allData} top={topData} showSelected={showSelected}></SideBar>
      </>
      )
    }

    // Else return loading spinner
    else {
    return ( 
      <>
         <Box display="flex" height="100vh" justifyContent="center" alignItems="center" children={<Spinner children={<div>Loading..</div>}></Spinner>}></Box>
      </>
      )
    }
}

export default App;