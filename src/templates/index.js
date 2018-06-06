import React from "react";
import Link, { navigateTo } from 'gatsby-link'
import { rhythm } from "../utils/typography";
import g from "glamorous";
import { Pagination } from 'antd';

class Index extends React.Component {
    
    onChange = (page,pageSize) => {
        if(page == 1){
            navigateTo('/')
        } else {
            navigateTo(`/${page}`)
        }
    }

    render(){
        const { pathContext } = this.props;
        const {
            group,
            pathPrefix,
            first,
            last,
            index,
            pageCount,
            additionalContext
        } = pathContext
        // const posts = data.allMarkdownRemark;
        const posts = group;
        const total = additionalContext.total;
        return (
            <div>
                <h4>{posts.length} Posts</h4>
                {posts.map(({ node }) => (
                    <div key={node.id}>
                        <Link to={node.fields.slug} style={{textDecoration:'none',color:'inherit'}}>
                            <g.H3 marginBottom={rhythm(1 / 4)}>
                                {node.frontmatter.title}{" "}
                                <g.Span color="#BBB">— {node.frontmatter.date}</g.Span>
                            </g.H3>
                            <p>{node.excerpt}</p>
                        </Link>
                    </div>
                ))}
                <Pagination current={index} total={total} pageSize={5} onChange={this.onChange}/>
            </div>
        ); 
    }
}

export default Index;