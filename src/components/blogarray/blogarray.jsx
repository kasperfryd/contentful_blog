import React, { useState } from 'react'
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Card, CardContent, CardHeader, Typography } from '@material-ui/core';
import Footer from '../footer/footer';
import BlogStyle from './blog.module.scss';
import { InView } from 'react-intersection-observer'
import {Box} from '@material-ui/core';
import Spinner from '../material-spinner/spinner';



function CreateBlogArray(props) {

    // set needed states
    const [blogArray, setBlogArray] = useState([]);
    const [firstStart, setFirstStart] = useState(true);

    // set window on scroll event to listen for when the user reaches the bottom,
    // then refresh content by fetching 5 new articles and updating the current array
    window.onscroll = function (ev) {
        if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
            if (props.selected === false) {
                props.refreshContent();
                updateArray();
            }
        };
    }
    // Set options for documentToReactComponents method
    // if there is an embedded entry or asset create a new image with the src of the current img
    const options = {
        renderNode: {

            [BLOCKS.EMBEDDED_ENTRY]: ({ data: { target: { fields } } }) =>
                <div className={BlogStyle.Center}>{
                    <img src={fields.file.url} alt={fields.title} />}
                </div>,
            [INLINES.EMBEDDED_ENTRY]: ({ data: { target: { fields } } }) =>
                <div className={BlogStyle.Center}>{
                    <img src={fields.file.url} alt={fields.title} />}
                </div>,
            [BLOCKS.EMBEDDED_ASSET]: ({ data: { target: { fields } } }) =>
                <div className={BlogStyle.Center}>{
                    <img src={fields.file.url} alt={fields.title} />}
                </div>,
            [INLINES.EMBEDDED_ASSET]: ({ data: { target: { fields } } }) =>
                <div className={BlogStyle.Center}>{
                    <img src={fields.file.url} alt={fields.title} />}
                </div>,
        }
    };

    // function to update array by using spread operator on temp array and blogArray.
    const updateArray = async () => {
        console.log("Updating array")
        setFirstStart(false);
        setBlogArray([...blogArray, blogArrayTemp])
    }

    // initialize empty array
    let blogArrayTemp = [];

    //if apidata is set, create a blogarray of cards with the content from the blog entries. 
    if (props.apiData && props.apiData.items) {
        const blogs = props.apiData.items;
        blogs.map((fields => {
            // Set all needed variables to be fed into material ui card
            let title = fields.fields.title;
            let data = fields.fields.blog;
            let author = fields.fields.author;
            let date = fields.fields.date;
            let id1 = Math.random();
            let id2 = Math.random();
            // push the card into the temporary array
            blogArrayTemp.push(
                //create inview ref which wraps the object and sends a callback when card enters view.
                <InView key={id1} threshold="0.20" rootMargin="50px 0px -150px 0px">
                {({ inView, ref, entry }) => (
                <Card key={id2} ref={ref} className={BlogStyle.MainCard}>
                    <CardHeader title={<h1>{title}</h1>} subheader={<p>Author: {author} | Posted on: {date}</p>}>
                    { // if inview is true (card is atleast 40% in view) call setTitle with this title
                    inView && props.setTitle(title)}
                    </CardHeader>
                    <CardContent id={title} children={
                        // set all content as children on the card
                        <>
                            {documentToReactComponents(data, options)}
                        </>
                    }>
                    </CardContent>
                </Card>)}
                </InView>
            )
            return null;
        }))
        
    // conditional rendering.
    // if firststart is true display the temparray as blogarray is empty
    // if selected is true display the temp array aswell
    if (firstStart === true || props.selected === true) {

        if (blogArrayTemp.length > 0){
        return (
            <>
            {blogArrayTemp}
            </>
        )
        }
        else{
           let doneLoading = false;
           let timer = setTimeout(() => {
                doneLoading = true;
            }, 4000);
            return (
                <Box display="flex" height="100vh" justifyContent="center" alignItems="center" children={<Typography> Can not find blog post.. Try again</Typography>}></Box>
                )
        }
    }}

    // if nothing specific is selected show the regular array with footer
    if (props.selected === false && blogArray) {
        return (
            <>
            {blogArray}
            {!props.contentMsg ? <Footer></Footer> : <Footer contentMsg={props.contentMsg}></Footer>}
            </>
        )
    }

    // if nothing else. Return error
    else {
        return (
            <Box display="flex" height="100vh" justifyContent="center" alignItems="center" children={<Spinner children={<div>Loading..</div>}></Spinner>}></Box>
            )
    }
}


export default CreateBlogArray;