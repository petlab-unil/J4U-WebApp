import Link from 'next/link';
import { Row, Col, Typography, Button } from 'antd';

const { Paragraph, Title } = Typography;

export default () => {
  return (
    <Row justify="center">
      <Col lg={10} xs={22}>
        <Title>Informations sur le tirage au sort</Title>
        <Paragraph>
          Vous êtes invité à participer à une étude pilote qui vise à vous aider dans votre
          recherche d’emploi. Nous vous remercions de votre participation. Cette étude est réalisée
          par les universités de Genève et de Lausanne.
        </Paragraph>
        <Paragraph>
          Vous êtes invité à participer à une étude pilote qui vise à vous aider dans votre
          recherche d’emploi. Nous vous remercions de votre participation. Cette étude est réalisée
          par les universités de Genève et de Lausanne.
        </Paragraph>
        <Paragraph>
          Si vous acceptez de participer, nous vous demanderons d’utiliser l’outil mis à votre
          disposition et de répondre à des questionnaires. Il y aura entre un et deux questionnaires
          envoyés chaque semaine. Chaque participation aux questionnaires rapporte des billets de
          loterie. Plus vous participez, plus vous collecterez des billets, plus vos chances de
          gagner au tirage au sort final seront grandes. Voici la répartition des points :
          <ul>
            <li>
              Inscription au projet J4U sur le site j4u.unil.ch (avant la date butoir indiquée dans
              l’email) : 10 billets de loterie
            </li>
            <li>
              Participation à l’enquête sur le site j4u.unil.ch (avant la date butoir indiquée dans
              l’email) : 10 billets de loterie
            </li>
            <li>
              Participation aux questionnaires reçus par email (avant la date butoir indiquée dans
              l’email) : 5 billets de loterie
            </li>
            <li>
              Utilisation du site j4u.unil.ch (onglets « recommandations professionnelles » ou «
              recherche d’emploi ») : 3 billets de loterie / jours
            </li>
          </ul>
        </Paragraph>
        <Paragraph>
          Chaque participant fera partie d'un tirage au sort dont le prix est de CHF 2000 en
          espèces.
        </Paragraph>
        <Paragraph>
          Les gagnants de la loterie seront notifiés par email dans les quelques jours qui suivent
          la fin du projet.
        </Paragraph>
        <Paragraph>
          Votre participation est complètement volontaire et vous êtes totalement libre d'arrêter
          votre participation à n'importe quel moment, sans préavis. En cas d’arrêt, seuls les
          tickets déjà récoltés compteront pour le tirage au sort.
        </Paragraph>
        <Paragraph>
          Pour rappel, vos réponses seront collectées de façon confidentielle et anonymisée. Dans le
          cas où les résultats de l’étude seraient publiés, votre identité ne sera pas utilisée. La
          confidentialité des données est entièrement garantie.
        </Paragraph>
        <Paragraph>
          Afin de confirmer votre participation au tirage au sort, nous vous demandons de compléter
          ce questionnaire et de nous le renvoyer à l’adresse indiquée au-dessus jusqu’au XXX.
        </Paragraph>
        <Paragraph>
          Afin de confirmer votre participation au tirage au sort, nous vous demandons de{' '}
          <a href={'formUrl'}>télécharger</a> et de compléter ce formulaire et de nous le renvoyer à
          l’adresse indiquée au-dessus.
        </Paragraph>
      </Col>
      <Col span={24} />
      <Col lg={10} xs={22}>
        <Paragraph>
          <Link href="/">
            <Button type="link">Page d'accueil</Button>
          </Link>
        </Paragraph>
      </Col>
    </Row>
  );
};
