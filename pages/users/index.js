

import Head from 'next/head'
import Layout, { siteTitle } from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'
import fetch from 'node-fetch'
import Link from 'next/link'


export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch('https://jsonplaceholder.typicode.com/users')
  const users = await res.json()

  // By returning { props: posts }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      users,
    },
  }
}

export default function Users({ users }) {
  return (
    <Layout>
      <Head>
        <title>Users List</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Users list</h2>
        <ul className={utilStyles.list}>
          {users.map(({ id, name, email }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href="/users/[id]" as={`/users/${id}`}>
                <a>{name}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                {email}
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}