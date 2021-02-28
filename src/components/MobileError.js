import { Result, Button, Typography } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';

const { Paragraph, Text } = Typography;

export default () => {
  return (
    <Result
      status="error"
      title="Appareil non valide"
      subTitle="Vous ne devez pas utiliser utiliser un appareil mobile"
    >
      <div className="desc">
        <Paragraph>
          Vous êtes bien sur la page officielle du projet « Job For You » (J4U) mené par les
          Universités de Lausanne et de Genève.
        </Paragraph>

        <Paragraph>
          Malheureusement, le site J4U n’est pas compatible avec les appareils mobiles. Nous vous
          recommandons d’utiliser un ordinateur afin de pouvoir participer au projet.
        </Paragraph>

        <Paragraph>
          En cas de difficulté, n’hésitez pas à nous joindre à l’adresse suivante : j4u@unil.ch
        </Paragraph>
        <Paragraph>L’équipe J4U vous remercie</Paragraph>
      </div>
    </Result>
  );
};
