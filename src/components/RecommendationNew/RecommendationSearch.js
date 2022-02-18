import { Form, Row, Col, Button, Slider } from 'antd';
import get from 'lodash/get';
import useMe from 'hooks/me';
import { CantonSelect } from 'components/Select';
import { useTracker } from 'hooks/tracker';
import JobSearch from './JobSearch';
import Help from './Help';

const ExplainPreviousJob = () => {
  return (
    <>
      <Col span={12}>
        <p>Voici votre outil personnalisé avec les réponses de votre questionnaire.</p>

        <p>
          Choisissez votre emploi précédent et les niveaux d'importance avant de cliquer sur
          "Recommander".
        </p>
        <p>
          <strong>Comment régler les niveaux d’importance ?</strong>
        </p>
        <p>
          Importance <u>de mon profil personnel</u> correspond au poids attribué au questionnaire
          que vous avez complété.
        </p>
        <p>
          <u>Importance de mon emploi précédent</u> correspond au poids attribué au champ "emploi
          précédent". 
        </p>
      </Col>
      <Col span={12}>
        <p>
          <strong>Astuces</strong>
          <ul>
            <li>
              Pour connaître les métiers qui vous conviendraient (ou qui vous auraient convenu) du
              point de vue de votre profil personnel, indépendamment de ce que vous avez fait par le
              passé : mettez Importance de mon profil personnel à 1 et Importance de mon emploi
              précédent à 0.
            </li>
            <li>
              A l'inverse, pour savoir avoir des suggestions qui sont cohérentes avec votre dernier
              métier : mettez Importance de mon profil personnel à 0 et Importance de mon emploi
              précédent à 1.
            </li>
            <li>N'hésitez pas à jouer avec les curseurs. </li>
          </ul>
        </p>
        <p>
          <strong>Pour en savoir plus </strong>
        </p>
        <p>Pour plus de renseignements cliquez sur les points d'interrogation.</p>
      </Col>
    </>
  );
};

const ItemSelect = (SelectComponent, props) => ({ value, onChange }) => {
  return <SelectComponent value={value} setValue={onChange} {...props} />;
};
const CantonItem = ItemSelect(CantonSelect);

const Recommendation = ({ setRecomVariables }) => {
  const onValuesChange = (v) => console.log(v, 'vvv');
  const me = useMe();
  const alphaFixed = get(me, 'cohort.alphaFixed');
  const betaFixed = get(me, 'cohort.betaFixed');

  const onFinish = (v) => {

    // tracker.track({
    //   canton_code: v.cantonCode,
    //   old_job_isco08: v.oldJobData.isco08,
    //   old_job_title: v.oldJobData.title,
    //   alpha: v.alpha,
    //   beta: v.beta,
    // });
    setRecomVariables(v);
  };

  return (
    <Form
      layout="vertical"
      name="basic"
      onValuesChange={onValuesChange}
      style={{ width: '100%' }}
      onFinish={onFinish}
      initialValues={{
        oldJobData: me.oldJobIsco08
          ? {
              isco08: me.oldJobIsco08 || undefined,
              title: me.oldJobTitle || undefined,
            }
          : undefined,
        alpha: me.alpha || 0.5,
        beta: me.beta || 0.5,
      }}
    >
      <br />
      <Row gutter={[24, 2]}>
        <Col lg={8} xs={12}>
          <Row>
            <Col span={24}>
              <Form.Item
                label="Emploi précédent"
                name="oldJobData"
                rules={[{ required: true, message: 'Champ obligatoire' }]}
              >
                <JobSearch me={me} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Help url="https://www.youtube.com/watch?v=iYiq3ot9qNI" />
            </Col>
          </Row>
        </Col>

        <Col span={2}>
          <Form.Item
            name="cantonCode"
            label="Canton"
            rules={[{ required: true, message: 'Champ obligatoire' }]}
          >
            <CantonItem placeholder="Canton" showSearch />
          </Form.Item>
        </Col>

        <Col lg={5} xs={6}>
          <Row>
            <Col span={24}>
              <Form.Item
                label="Importance de mon profil personnel"
                name="alpha"
                rules={[{ required: true, message: 'Champ obligatoire' }]}
              >
                <Slider
                  min={0.01}
                  max={1}
                  step={0.01}
                  style={{ width: '100%' }}
                  disabled={alphaFixed}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Help url="https://www.youtube.com/watch?v=tpcz6F4Y2Mw" />
            </Col>
          </Row>
        </Col>

        <Col lg={5} xs={6}>
          <Form.Item
            label="Importance de mon emploi précédent"
            name="beta"
            rules={[{ required: true, message: 'Champ obligatoire' }]}
          >
            <Slider min={0.01} max={1} step={0.01} style={{ width: '100%' }} disabled={betaFixed} />
          </Form.Item>
        </Col>

        <Col lg={4} xs={6}>
          <Row>
            <Col span={24}>
              <Form.Item label="Recommander">
                <Button type="primary" htmlType="submit">
                  Recommander
                </Button>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Help url="https://www.youtube.com/watch?v=FjtWuRmA0nQ" />
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <br />
          <br />
        </Col>
        <ExplainPreviousJob />
      </Row>
    </Form>
  );
};

export default Recommendation;
