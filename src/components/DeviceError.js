import { Result, Button, Typography } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';

const { Paragraph, Text } = Typography;

export default () => {
  return (
    <Result
      status="error"
      title="Navigateur non valide"
      subTitle="Vous devez utiliser le navigateur Chrome"
      extra={[
        <Button key="buy" type="primary">
          <a href="https://www.google.com/chrome/index.html">Télécharger Chrome</a>
        </Button>,
      ]}
    >
      <div className="desc">
        <Paragraph>
          Vous êtes bien sur la page officielle du projet « Job For You » (J4U) mené par les
          Universités de Lausanne et de Genève.
        </Paragraph>

        <Paragraph>
          Malheureusement, le site J4U n’est pas compatible avec ce navigateur web. Nous vous
          recommandons d’installer Google Chrome afin de pouvoir participer au projet.
        </Paragraph>

        <Paragraph>Voici le lien de téléchargement à partir d'un site sécurisé:</Paragraph>
        <Paragraph>
          <a href="https://www.google.com/chrome/index.html">Télécharger Chrome</a>
        </Paragraph>

        <Paragraph>
          En cas de difficulté, n’hésitez pas à nous joindre à l’adresse suivante : j4u@unil.ch
        </Paragraph>
        <Paragraph>L’équipe J4U vous remercie</Paragraph>
      </div>
    </Result>
  );
};
