import Head from 'next/head';

import withLayout from 'components/layout/Layout';
import { getNavigation } from 'helpers/navigation';
import { getData } from 'helpers/apiServices';
import AllProjects from 'components/pages/AllProjects';

const ProjectsPage = ({ all, projects }) => {
  return (
    <>
      <Head>
        <title>{all.title}</title>
        <meta name="description" content={all.description} />
      </Head>
      <AllProjects title={all} data={projects} />
    </>
  );
};

export default withLayout(ProjectsPage);

export const getStaticProps = async ({ locale, locales }) => {
  const [navData, translation, all, projects, footer] = await Promise.all([
    getNavigation('pages', { locale, sort: 'navPosition' }, 5),
    getData('translation', { locale }),
    getData('all-project', { locale }),
    getData('projects', { locale, populate: '*', sort: 'navPosition' }),
    getData('footer', { locale, populate: '*' }),
  ]);

  return {
    props: {
      locale,
      locales,
      navData,
      translation: translation.attributes,
      all: all.attributes,
      footer: footer.attributes,
      projects,
    },
  };
};
