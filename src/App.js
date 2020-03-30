import React, {
  useState,
  useEffect
} from 'react';
import './App.css';
import {Box} from '@material-ui/core';
import CreateBlogArray from './components/blogarray/blogarray';
import SideBar from './components/material-sidebar/sidebar';
import Spinner from './components/material-spinner/spinner';
function App() {

  const contentful = require('contentful')
  const [apiData, setApiData] = useState()
  const [arrCount, setArrCount] = useState(5);
  const [topData, setTopData] = useState();
  const [selected, setSelected] = useState(false);
  const [allData, setAllData] = useState();
  
  // set up search queries.
  const id = "entries";
  const token = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    startUp();
  }, [])
  
  const startUp = () => {
    getLatestTopPosts(id);
    FetchContent(id);
  }
  
  // Create fetch with contentful client.
  const FetchContent = async (id, skipCount, selected) => {  
    const client = contentful.createClient({
      space: 'ahavbgs7z0ax',
      accessToken: token
    })
    
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
      if (skipCount == undefined){
        skipCount = 0;
      }
      client.getEntries({
        content_type: 'blog',
        skip: skipCount.toString(),
        limit:"5",
      })
      .then((response) => setApiData(response))
      .catch(console.error)
    }
  }
  
  const getLatestTopPosts = async (id) => {
    const client = contentful.createClient({
      space: 'ahavbgs7z0ax',
      accessToken: token
    })

    client.getEntries({
      content_type: 'blog',
      limit:"5",
    })
    .then((response) => setTopData(response))
    .catch(console.error)
  }

  const getAllData = async (id) => {
    const client = contentful.createClient({
      space: 'ahavbgs7z0ax',
      accessToken: token
    })

    client.getEntries({
      content_type: 'blog',
      limit:"100",
    })
    .then((response) => setAllData(response))
    .catch(console.error)
  }
  
  const showSelected = (selected_name) => {
    const scrollOptions = {
      left: 0,
      top: 0,
      behavior: 'smooth',
    }

    FetchContent(id, undefined, selected_name.toString());
    window.scrollTo(scrollOptions);  
    setSelected(true);
  }
  
    const refreshContent = async () => {
      console.log("Fetching new content and updating")
      FetchContent(id, arrCount);
      setArrCount(arrCount+5);
    
  }
  
  // If apidata is present, create react component from rich text
  if (apiData && topData) {
    return ( 
      <>
    <CreateBlogArray setArrCount={setArrCount} selected={selected} apiData={apiData} refreshContent={refreshContent}/>
    <SideBar setSelected={setSelected} getAllData={getAllData} allArray={allData} top={topData} showSelected={showSelected}></SideBar>
    </>
      )
    }

    // Else return loading spinner
    else {
    return ( 
      <>
         <Box display="flex" height="100vh" justifyContent="center" alignItems="center" children={<Spinner children={<div>Loading..</div>}></Spinner>}>
          </Box>
      </>
      )
    }
}

export default App;