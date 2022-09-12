import PropTypes from 'prop-types';
import Head from 'next/head';

// import Icon from 'public/vercel.svg';

// import axios from 'axios';
import withLayout from 'components/layout/Layout';

import Section from 'components/reusable/Section';
import Container from 'components/reusable/Container';

import { getData, getNavigation } from '../helpers/navigation';

import { teams } from 'data/teamsData';
import Team from '../components/Team/Team';
import Hero from '../components/layout/Hero';
import About from '../components/layout/About';
import { hero } from 'data/hero';
import { about } from 'data/about';

// const API_KEY = process.env.API_KEY;
// const BASE_URL = `https://${API_KEY}.mockapi.io/api/`;

// const getEndpoint = (endpoint = '') => BASE_URL + endpoint;

const Home = ({ data, about }) => {
  return (
    <Section>
      <Container>
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Hero data={data} />
        <About data={about} />
        <Team teams={teams} />
      </Container>
    </Section>
  );
};

export default withLayout(Home);

export const getStaticProps = async ({ locale }) => {
  const [navData, translation] = await Promise.all([
    getNavigation('pages', { locale, sort: 'navPosition' }, 5),
    getData('translation', { locale }),
  ]);

  const data = hero ?? { ru: {}, uk: {}, en: {}, cs: {} };
  const aboutRes = about ?? { ru: {}, uk: {}, en: {}, cs: {} };

  return {
    props: {
      navData,
      teams,
      data: data[locale],
      about: aboutRes[locale],
      translation: translation.attributes,
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
