import Layout from '../../components/layout'
import fetch from 'node-fetch'
import utilStyles from '../../styles/utils.module.css'

export async function getStaticProps({ params }) {
    const res = await fetch('https://jsonplaceholder.typicode.com/users/' + params['id'])
    const userData = await res.json()

    // By returning { props: posts }, the Blog component
    // will receive `posts` as a prop at build time
    return {
        props: {
          userData
        }
    }
  }

export async function getStaticPaths() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users')
    const users = await res.json()
    const paths =  users.map(user => {
        return {
            params: {
                id: user["id"].toString()
            }
        }
    })
    return {
      paths,
      fallback: false
    }
  }

  export default function Post({ userData }) {
    return (
      <Layout>
        <article>
            <h1 className={utilStyles.headingXl}>{userData.name}</h1>
            <div className={utilStyles.lightText}>
              Email: {userData.email}<br/>
              Phone: {userData.phone}<br/>
              Address: {userData.address.suite}, {userData.address.street}, {userData.address.city}, {userData.address.zipcode}<br/>
              Company: {userData.company.name}<br/>
            </div>
        </article>
      </Layout>
    )
  }