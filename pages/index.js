import PropTypes from 'prop-types';
import Head from 'next/head';

import withLayout from 'components/layout/Layout';

import { getNavigation } from 'helpers/navigation';

import Team from 'components/Team/Team';
import Hero from 'components/sections/Hero';
import About from 'components/sections/About';

import { getData } from 'helpers/apiServices';

const Home = ({ teams, home }) => {
  return (
    <>
      <Head>
        <title>{home.heroTitle}</title>
        <meta name="description" content={home.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero data={home}/>
      <About data={home}/>
      <Team teams={teams} />
    </>
  );
};

export default withLayout(Home);

export const getStaticProps = async ({ locale }) => {
  const [navData, translation, homePage, teams, footer] = await Promise.all([
    getNavigation('pages', { locale, sort: 'navPosition' }, 5),
    getData('translation', { locale }),
    getData('home-page', { locale, populate: '*' }),
    getData('section-team', { locale, populate: 'teams.foto' }),
    getData('footer', { locale, populate: '*' }),
  ]);

  return {
    props: {
      navData,
      home: homePage.attributes,
      translation: translation.attributes,
      teams: teams.attributes,
      footer: footer.attributes,
    },
  };
};

Home.propTypes = {
  navData: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
