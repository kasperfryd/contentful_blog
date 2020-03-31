import React, { useState } from 'react'
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import Footer from '../footer/footer';
import BlogStyle from './blog.module.scss';

function CreateBlogArray(props) {

    const [blogArray, setBlogArray] = useState([]);
    const [firstStart, setFirstStart] = useState(true);

    window.onscroll = function (ev) {
        if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
            if (props.selected === false) {
                console.log(props.selected)
                props.refreshContent();
                updateArray();
            }
        };
    }
    const options = {
        renderNode: {

            [BLOCKS.EMBEDDED_ENTRY]: ({ data: { target: { fields } } }) =>
                <div className={BlogStyle.Center}>{
                    <img src={fields.file.url} alt={"Something"} />}
                </div>,
            [INLINES.EMBEDDED_ENTRY]: ({ data: { target: { fields } } }) =>
                <div className={BlogStyle.Center}>{
                    <img src={fields.file.url} alt={"Something"} />}
                </div>,
            [BLOCKS.EMBEDDED_ASSET]: ({ data: { target: { fields } } }) =>
                <div className={BlogStyle.Center}>{
                    <img src={fields.file.url} alt={"Something"} />}
                </div>,
            [INLINES.EMBEDDED_ASSET]: ({ data: { target: { fields } } }) =>
                <div className={BlogStyle.Center}>{
                    <img src={fields.file.url} alt={"Something"} />}
                </div>,
        }
    };

    const updateArray = async () => {
        console.log("Updating array")
        setFirstStart(false);
        setBlogArray([...blogArray, blogArrayTemp])
    }

    let blogArrayTemp = [];

    if (props.apiData && props.apiData.items) {
        const blogs = props.apiData.items;
        blogs.map((fields => {
            let title = fields.fields.title;
            let data = fields.fields.blog;
            let author = fields.fields.author;
            let date = fields.fields.date;
            let id = Math.random();
            blogArrayTemp.push(

                <Card key={id} className={BlogStyle.MainCard}>
                    <CardHeader title={<h1>{title}</h1>}></CardHeader>
                    <CardContent children={
                        <>
                            {documentToReactComponents(data, options)}
                            <p>Author: {author}</p>
                            <p>Posted on: {date}</p>
                        </>
                    }>
                    </CardContent>
                </Card>
            )
        }

        ))
        if (firstStart === true) {
            return (
                <>
                    {blogArrayTemp}
                </>
            )
        }
    }

    if (props.selected === true) {
        return (
            <>
                {blogArrayTemp}
            </>
        )
    }

    if (props.selected === false && blogArray) {
        return (
            <>
                {blogArray}
                {!props.contentMsg ? <Footer></Footer> : <Footer contentMsg={props.contentMsg}></Footer>}
            </>
        )
    }

    else {
        return (
            <h3>Nothing found</h3>
        )
    }
}


export default CreateBlogArray;