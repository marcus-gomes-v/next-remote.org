import { useRouter } from 'next/router';
import Layout from '../../components/layout';
import db from '../../lib/db';

const Post = (props: any) => {
    const { entry } = props;
    const router = useRouter();
    if (router.isFallback) {
        return (
            <div>loading</div>
        );
    } else {
        if (entry) {
            return (
                <Layout page='roles-detail'>
                    <div>
                        <h1>{entry.title}</h1>
                        <h4>{entry.created}</h4>
                        <p>{entry.body}</p>
                    </div>
                </Layout>
            );
        } else {
            return (
                <div>not found</div>
            );
        }
    }
};

export const getStaticPaths = async () => {
    const roles = await db.collection('roles').get();
    const paths = roles.docs.map(entry => ({
        params: {
            slug: entry.data().slug
        }
    }));
    return {
        paths,
        fallback: true
    };
};

export const getStaticProps = async (context: any) => {
    const { slug } = context.params;
    const res = await db.collection('roles').where('slug', '==', slug).get();
    const entry = res.docs.map(entry => entry.data());
    if (entry.length) {
        return {
            props: {
                entry: entry[0]
            }
        };
    } else {
        return {
            props: {}
        };
    }
};

export default Post;
