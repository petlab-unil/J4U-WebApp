import { useState } from 'react';
import { Modal, Descriptions, Button, Typography, Row, Col } from 'antd';
import styled from 'styled-components';
import useMe from 'hooks/me';
import every from 'lodash/every';
import isEmpty from 'lodash/isEmpty';
import { getCertificate } from 'helpers';
import { PermanentTag, ImmediatelyTag, LoadTag } from './Tags';

const { Text } = Typography;

const ScrollDiv = styled.div`
  width: 100%;
  max-height: 200px;
  overflow-y: scroll;
`;

const JobDetails = ({ position, cancel }) => {
  const [view, setView] = useState('INFO');
  const me = useMe();

  if (!position) return null;

  const {
    externalUrl,
    descriptions: [{ title, description }],
    location: { city, countryCode, cantonCode },
    contact: { firstName, lastName, phone, email },
    company: { name: companyName, city: companayCity, countryCode: companyCountyCode },
    employment: { startDate, endDate },
  } = position;

  const emptyContact = every([firstName, lastName, phone, email], isEmpty);

  const infoFooter = [
    <Button key="apply" type="primary" onClick={() => setView('APPLY')}>
      Postuler
    </Button>,
  ];
  const applyFooter = [
    <Button key="back" type="primary" onClick={() => setView('INFO')}>
      Retour
    </Button>,
  ];

  return (
    <Modal
      width="80%"
      visible={!!position}
      onCancel={cancel}
      title="Details"
      footer={view === 'APPLY' ? applyFooter : infoFooter}
    >
      <Descriptions title="General" layout="vertical" column={3}>
        <Descriptions.Item label="Titre">{title}</Descriptions.Item>
        <Descriptions.Item label="Tags">
          <PermanentTag position={position} />
          <ImmediatelyTag position={position} />
          <LoadTag position={position} />
        </Descriptions.Item>
        <Descriptions.Item label="Dates">
          {startDate ? `Début: ${startDate}` : null}
          {endDate ? `Fin: ${endDate}` : null}
        </Descriptions.Item>
        <Descriptions.Item span={3} label="Description">
          <ScrollDiv>{description}</ScrollDiv>
        </Descriptions.Item>
      </Descriptions>

      <Descriptions title="Entreprise" layout="horizontal">
        <Descriptions.Item label="Nom">{companyName}</Descriptions.Item>
        <Descriptions.Item label="Ville">{companayCity}</Descriptions.Item>
        <Descriptions.Item label="Pays">{companyCountyCode}</Descriptions.Item>
      </Descriptions>

      <Descriptions title="Job Localisation" layout="horizontal">
        <Descriptions.Item label="Ville">{city}</Descriptions.Item>
        <Descriptions.Item label="Pays">{countryCode || 'CH'}</Descriptions.Item>
        <Descriptions.Item label="Canton">{cantonCode}</Descriptions.Item>
      </Descriptions>

      {emptyContact || view === 'INFO' ? null : (
        <Descriptions title="Contact" layout="horitontal">
          <Descriptions.Item label="Prenom">{firstName}</Descriptions.Item>
          <Descriptions.Item label="Nom">{lastName}</Descriptions.Item>
          <Descriptions.Item label="Telephone">{phone}</Descriptions.Item>
          <Descriptions.Item label="Email">{email}</Descriptions.Item>
        </Descriptions>
      )}
      {view === 'APPLY' ? (
        <Row gutter={[24, 24]}>
          <Col>
            <Button key="apply" type="primary">
              <a href={externalUrl} target="_blank" rel="noopener noreferrer">
                Postuler sur site externe
              </a>
            </Button>
          </Col>
          <Col>
            <Button key="certificate" type="primary" onClick={() => getCertificate(me, title)}>
              Certificat
            </Button>
          </Col>
        </Row>
      ) : null}
    </Modal>
  );
};

export default JobDetails;
