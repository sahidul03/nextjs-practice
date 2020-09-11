import Layout from '../../components/layout'
import fetch from 'node-fetch'
import utilStyles from '../../styles/utils.module.css'

export async function getStaticProps({ params }) {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts/' + params['id'])
    const postData = await res.json()

    // By returning { props: posts }, the Blog component
    // will receive `posts` as a prop at build time
    return {
        props: {
            postData
        }
    }
  }

export async function getStaticPaths() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    const posts = await res.json()
    const paths =  posts.map(post => {
        return {
            params: {
                id: post["id"].toString()
            }
        }
    })
    return {
      paths,
      fallback: false
    }
  }

  export default function Post({ postData }) {
    return (
      <Layout>
        <article>
            <h1 className={utilStyles.headingXl}>{postData.title}</h1>
            <div className={utilStyles.lightText}>
              {postData.body}
            </div>
        </article>
      </Layout>
    )
  }