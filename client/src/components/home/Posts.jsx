import { Grid, Box } from "@material-ui/core";
import Post from "./Post";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllPosts } from "../../service/api";

const Posts = () => {
    //     interface IPostData {
    //         title: string;
    //         description: string;
    //         picture: string;
    //         username: string;
    //         categories: string[];
    //         createdDate: Date;
    //     }
    const [posts, getPosts] = useState([]);
    const { search } = useLocation();

    useEffect(() => {
        const fetchData = async () => {
            let data = await getAllPosts(search); // params in url
            getPosts(data);
        };
        fetchData();
    }, [search]);
    // console.log({ posts });

    return (
        <>
            {posts?.length > 0 ? (
                posts.map((post) => (
                    <Grid item lg={3} sm={4} xs={12}>
                        <Link
                            style={{ textDecoration: "none", color: "inherit" }}
                            to={`details/${post._id}`}
                        >
                            <Post post={post} />
                        </Link>
                    </Grid>
                ))
            ) : (
                <Box
                    style={{
                        color: "878787",
                        margin: "30px 80px",
                        fontSize: 18,
                    }}
                >
                    No data is available for selected category
                </Box>
            )}
        </>
    );
};

export default Posts;
