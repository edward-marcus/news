import React, { useState, useEffect } from 'react';
import Title from './components/Title/Title';
import Content from './components/Content/Content';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Navbar, Form } from 'react-bootstrap';

const App = (props) => {
  const [error, setError] = useState(null);
  const [isLoaded, setisLoaded] = useState(false);
  const [articles, setArticles] = useState([]);
  const [country, setCountry] = useState('gb');

  const handleSubmit = (event) => {
    event.preventDefault();

    changeCountryHandler();
  };

  const changeCountryHandler = () => {
    setCountry(document.getElementById('myCountry').value);
  };

  useEffect(() => {
    let url = `https://newsapi.org/v2/top-headlines?country=${country}`;

    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',

        'x-api-key': 'myApiKey',
      },
    })
      .then((res) => res.json())

      .then(
        (result) => {
          setisLoaded(true);
          setArticles(result.articles);
        },
        (error) => {
          setisLoaded(false);
          setError(error);
        }
      );
  }, [country]);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <Navbar className="bg-secondary justify-content-between" variant="dark">
          <div>
            <h2>Headlines from all over the world!</h2>
          </div>
          <Form inline>
            <Form.Group>
              <Form.Label className="justify-content-center text-center">
                Select the country:{' '}
              </Form.Label>
              <Form.Control
                as="select"
                id="myCountry"
                onChange={handleSubmit}
                defaultValue="GB"
                custom
                className="border border-danger pr-2 mr-2 ml-1"
              >
                <option value="AR">ARGENTINA</option>
                <option value="AU">AUSTRALIA</option>
                <option value="AT">AUSTRIA</option>
                <option value="BE">BELGIUM</option>
                <option value="BR">BRAZIL</option>
                <option value="BG">BULGARIA</option>
                <option value="CA">CANADA</option>
                <option value="CN">CHINA</option>
                <option value="CO">COLOMBIA</option>
                <option value="CU">CUBA</option>
                <option value="CZ">CZECH REPUBLIC</option>
                <option value="EG">EGYPT</option>
                <option value="FR">FRANCE</option>
                <option value="DE">GERMANY</option>
                <option value="GR">GREECE</option>
                <option value="HK">HONG KONG</option>
                <option value="HU">HUNGARY</option>
                <option value="IN">INDIA</option>
                <option value="ID">INDONESIA</option>
                <option value="IE">IRELAND</option>
                <option value="IL">ISRAEL</option>
                <option value="IT">ITALY</option>
                <option value="JP">JAPAN</option>
                <option value="LV">LATVIA</option>
                <option value="LT">LITHUANIA</option>
                <option value="MY">MALAYSIA</option>
                <option value="MX">MEXICO</option>
                <option value="MA">MORROCO</option>
                <option value="NL">NETHERLANDS</option>
                <option value="NZ">NEW ZEALAND</option>
                <option value="NG">NIGERIA</option>
                <option value="NO">NORWAY</option>
                <option value="PH">PHILIPPINES</option>
                <option value="PL">POLAND</option>
                <option value="PT">PORTUGAL</option>
                <option value="RO">ROMANIA</option>
                <option value="RU">RUSSIA</option>
                <option value="SA">SAUDI ARABIA</option>
                <option value="RS">SERBIA</option>
                <option value="SG">SINGAPORE</option>
                <option value="SK">SLOVAKIA</option>
                <option value="SI">SLOVENIA</option>
                <option value="ZA">SOUTH AFRICA</option>
                <option value="KR">SOUTH KOREA</option>
                <option value="SE">SWEDEN</option>
                <option value="CH">SWITZERLAND</option>
                <option value="TW">TAIWAN</option>
                <option value="TH">THAILAND</option>
                <option value="TR">TURKEY</option>
                <option value="AE">UAE</option>
                <option value="UA">UKRAINE</option>
                <option value="GB">UNITED KINGDOM</option>
                <option value="US">UNITED STATES</option>
                <option value="VE">VENEZUELA</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Navbar>
        {articles.map((article) => (
          <Card
            style={{ width: '100%', height: 'auto' }}
            key={article.title}
            className="mb-5 mt-4 bg-light"
          >
            <Card.Img
              variant="top"
              src={article.urlToImage}
              className="pr-3 pl-3"
              alt=""
            />

            <Card.Body>
              <Card.Title>
                {article.author} | {article.publishedAt}
                <Title title={article.title}>{article.title}</Title>
              </Card.Title>
              Description: {article.description}
              <Content content={article.content}>{article.content}</Content>
              Read the full article on{' '}
              <Card.Link
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {article.url}
              </Card.Link>
            </Card.Body>
          </Card>
        ))}
      </>
    );
  }
};

export default App;
