import React, {useState, useEffect} from 'react';
import './App.css';
import {Box} from '@material-ui/core';
import CreateBlogArray from './components/blogarray/blogarray';
import SideBar from './components/material-sidebar/sidebar';
import Spinner from './components/material-spinner/spinner';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import IconButton from '@material-ui/core/IconButton';

function App() {

  // initialize main states
  const contentful = require('contentful')
  const [apiData, setApiData] = useState()
  const [arrCount, setArrCount] = useState(0);
  const [topData, setTopData] = useState();
  const [selected, setSelected] = useState(false);
  const [allData, setAllData] = useState();
  const [contentMsg, setContentMsg] = useState()
  const [currentTitle, setCurrentTitle] = useState();

// set options for scroll behaviour
  const scrollOptions = {
    left: 0,
    top: 0,
    behavior: 'smooth',
  }
  
  // set up search queries.
  const id = "entries";
  const token = process.env.REACT_APP_API_KEY;
  const space = process.env.REACT_APP_SPACE;
  const content = process.env.REACT_APP_CONTENT;

  const client = contentful.createClient({
    space: space,
    accessToken: token
  })

  // first start hook
  useEffect(() => {
    getLatestTopPosts(id, client);
    fetchContent(id, client, arrCount);
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
    
  // create fetch with contentful client. 
  // if selected is present, only fetch the selected value
  // else fetch 5 results with skip as a parameter
  const fetchContent = async (id, client, skipCount, selected) => {  
    
    if (selected){
      client.getEntries({
        content_type: content,
        query: selected,
        limit:"1"
      })
      .then((response) => setApiData(response))
      .catch(console.error)
    }

    else{
      client.getEntries({
        content_type: content,
        skip: skipCount.toString(),
        limit:"5",
      })
      .then((response) => setApiData(response))
      .then(() => setArrCount(arrCount+5))
      .catch(console.error)
    }
  }
  
  // fetch to get the last 5 entries and only those 5.
  const getLatestTopPosts = async (id, client ) => {
    client.getEntries({
      content_type: content,
      limit:"5",
    })
    .then((response) => setTopData(response))
    .catch(console.error)
  }

  // fetch to get the last 100 entries for display in all list
  const fetchAllData = async (id, client) => {
    client.getEntries({
      content_type: content,
      limit:"100",
    })
    .then((response) => setAllData(response))
    .catch(console.error)
  }
  
  // function to fetch selected blog entry, scroll to top, and set selected to true
  const showSelected = (selected_name) => {
    fetchContent(id, client, 0, selected_name.toString());
    window.scrollTo(scrollOptions);  
    setSelected(true);
  }

  // async function to fetch all articles once user opens menu
  const getAllData = async () => {
      fetchAllData(id, client)
  } 
  
  // async function to refresh content and fetch new stuff when user reaches the bottom
  const refreshContent = async () => {
      console.log("Fetching new content and updating")
      fetchContent(id, client, arrCount);    
  }

  // function to scroll to top
  const goBacktoTop = () => {
    window.scrollTo(scrollOptions);  
  }

  // function to set current "inView" title
  const setTitle = (title) => {
    setTimeout(() => {
      setCurrentTitle(title);
    }, 500);
  }
  
  // if apidata is present, and apidata is 0, and contentMsg is not set, (no more new content)
  // then change spinner to upward arrow (go back to top) 
  if (apiData && topData) {
      if (apiData.items.length === 0){
        if (!contentMsg){
            setContentMsg(<IconButton children={<ArrowUpwardIcon />} onClick={() => goBacktoTop()}></IconButton>)
        }
      }
      // return main content (all blogs 5 at a time, and a sidebar)
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