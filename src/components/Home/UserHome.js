import Link from 'next/link';
import Router from 'next/router';
import { Row, Col, Card, Typography, Alert } from 'antd';
import { YoutubeFilled } from '@ant-design/icons';

const { Paragraph } = Typography;

const VerifyCard = ({ me }) => {
  if (!me.verified) {
    return (
      <Alert
        message="Etape 1 : Vérification du compte"
        description="Vous devez vérifier votre compte en suivant les intructions reçues par email"
        type="error"
        showIcon
      />
    );
  }

  return (
    <Alert
      message="Etape 1 : Adresse email vérifiée"
      description="Vous avez vérifié votre adresse email avec succès."
      type="success"
      showIcon
    />
  );
};

const SurveyCard = ({ me }) => {
  const desc = (
    <>
      <Paragraph>
        <b>
          Si vous venez de faire le questionnaire, patientez quelques minutes afin que l’application
          charge vos données puis{' '}
          <a href="/" onClick={() => Router.reload(window.location.pathname)}>
            actualisez la page
          </a>
          .
        </b>
      </Paragraph>

      <Paragraph>
        Sinon, vous devez compléter un questionnaire qui nous permettra de définir votre profil
        personnel. Ce questionnaire prend entre 45 min et 1 heure. 
      </Paragraph>

      <Paragraph>
        Rappel des instructions données dans la vidéo :
        <ul>
          <li>
            Répondez honnêtement. Il n’y a pas de réponse juste ou de réponse fausse, le but étant
            d’obtenir un outil personnalisé.
          </li>
          <li>Faites l’enquête dans un endroit calme sans être interrompu.</li>
          <li>
            Réalisez l’enquête depuis un ordinateur (enquête non compatible avec une tablette ou un
            smartphone).
          </li>
          <li>Lisez bien les instructions avant chaque exercice.</li>
        </ul>
      </Paragraph>

      <Paragraph>
        <a href={me.baselineLink}>Questionnaire</a>
      </Paragraph>
    </>
  );

  const good = (
    <>
      <p>{`Questionnaire complété le ${me.formDoneAt}`}</p>
      Accédez à vos recommandations personnalisées en cliquant sur l’onglet «
      <Link href="/recommandation" shallow>
        <a href="/recommandation"> Recommandations</a>
      </Link>{' '}
      ».
    </>
  );

  if (!me.formDone)
    return <Alert message="Etape 3: Questionnaire" description={desc} type="error" showIcon />;
  return <Alert message="Etape 3 : Questionnaire" description={good} type="success" showIcon />;
};

const VideoCard = ({ me }) => {
  const desc = (
    <>
      <Paragraph>
        <Link href="/videos" shallow>
          <a href="/videos"> Vidéos explicatives</a>
        </Link>
      </Paragraph>
    </>
  );

  if (me.verified) {
    return (
      <Alert
        message="Etape 2 : Visionner la vidéo explicative "
        description={desc}
        type="success"
        showIcon
      />
    );
  }

  return (
    <Alert
      message="Etape 2 : Visionner la vidéo explicative "
      description={desc}
      type="error"
      showIcon
    />
  );
};

export default ({ me }) => {
  return (
    <Row gutter={[24, 24]}>
      <Col lg={{ span: 12, offset: 6 }} md={{ span: 20, offset: 2 }}>
        <VerifyCard me={me} />
      </Col>
      <Col lg={{ span: 12, offset: 6 }} md={{ span: 20, offset: 2 }}>
        <VideoCard me={me} />
      </Col>
      <Col lg={{ span: 12, offset: 6 }} md={{ span: 20, offset: 2 }}>
        <SurveyCard me={me} />
      </Col>
    </Row>
  );
};
