import Link from 'next/link'
import { Row, Col, Button, Typography } from 'antd';

const { Paragraph, Title } = Typography;

export default () => {
  return (
    <Row justify="center">
      <Col lg={10} xs={22}>
        <Title>Informations légales</Title>
        <Paragraph>
          <strong>1. Objectifs de l’étude</strong>
          <br />
          Par la présente, nous vous proposons de participer à une étude qui vise à élaborer des
          outils pour vous soutenir dans votre recherche d’emploi. Ces outils mis à disposition ont
          trois objectifs. Ils visent à améliorer (i) l’information sur vos compétences, (ii) votre
          stratégie de recherche d’emploi, (iii) vos capacités cognitives, telles que votre capacité
          de raisonnement, votre mémoire, etc. Les outils sont attribués de façon aléatoire aux
          participants.
        </Paragraph>
        <Paragraph>
          Cette étude est réalisée en dehors de votre suivi à l’ORP et ne remet en rien en question les exigences de ce suivi et les objectifs définis avec la conseillère ou le conseiller ORP.
        </Paragraph>
        <Paragraph>
          L’étude a reçu l’accord du Service de l’emploi du canton de Vaud, et va être conduite
          dans le respect de la réglementation en vigueur.
        </Paragraph>
        <Paragraph>
          <strong>Glossaire de quelques termes utilisés dans ce document d’information</strong>
          <br />
          <strong>Cognition</strong> : ensemble des processus mentaux qui désignent le traitement de
          l’information tels que le raisonnement, la mémoire, la prise de décision et les fonctions
          exécutives.
          <br />
          <strong>Aléatoire </strong>:au hasard, c’est-à-dire par tirage au sort
        </Paragraph>

        <Paragraph>
          <strong>2. Informations générales sur le projet et les données</strong>
          <br />
          Cette étude propose d’explorer plusieurs outils utiles pour la recherche d’emploi.
        </Paragraph>
        <Paragraph>
          L’étude récoltera des données sur vos recherches d’emploi qui seront complémentées par des
          données administratives déjà disponibles (par ex. PLASTA, AVS). Les données seront ensuite
          traitées et analysées par l’équipe de recherche des professeurs en charge de l’étude. Les
          données seront utilisées conformément à la réglementation en vigueur en matière de
          protection de la vie privée et tout résultat sera publié sous forme de statistiques
          globales ne permettant pas d'identification personnelle.
        </Paragraph>
        <Paragraph>
          Nous effectuons cette étude dans le respect des prescriptions de la législation suisse.
          Nous suivons en outre l’ensemble des directives reconnues au niveau international. La
          commission d’éthique de l’Université de Lausanne a contrôlé et autorisé l’étude.
        </Paragraph>

        <Paragraph>
          <strong>3. Déroulement pour les participants</strong>
          <br />
          Les participants pourront s’inscrire en ligne et auront accès à un outil pour les
          accompagner dans leur recherche d’emploi. Par ailleurs, ils recevront des emails pour une
          période de 6 mois ou jusqu’à la désinscription à l’étude. Il est conseillé de vérifier les spams dans le cas où nos emails seraient considérés comme tels.
        </Paragraph>

        <Paragraph>
          <strong>4. Conditions de participation</strong>
          <br />
          Les participants doivent remplir les conditions suivantes:<br />
          - être majeurs et à la recherche d'un emploi<br />
          - utiliser les outils et répondre aux questionnaires des e-mails<br /><br />

          L'étude se déroulera sur 6 mois, dès votre inscription en ligne.
        </Paragraph>

        <Paragraph>
          <strong>5. Bénéfices pour les participants</strong>
          <br />
          Votre participation à cette étude pourra potentiellement augmenter vos chances de trouver un emploi et vous fournira des outils supplémentaires pour effectuer vos recherches d’emploi.
        </Paragraph>
        <Paragraph>
          <strong>6. Tirage au sort</strong>
          <br />
          Votre participation est complètement volontaire et vous êtes totalement libre d'arrêter votre participation à n'importe quel moment, sans préavis. 
          Pour cela, il suffit de cliquer sur le lien de désinscription en bas d’un de nos emails. Si vous vous désinscrivez avant la fin de l’étude, nous vous serions 
          reconnaissant de participer tout de même à l’évaluation de mi-parcours (3 mois après votre inscription) et de fin de parcours (6 mois après votre inscription). 
          Ce sont les deux seuls emails que vous recevrez après votre désinscription. 
        </Paragraph>
        <Paragraph>
          <strong>7. Tirage au sort</strong>  <br />
          Les personnes exerçant une activité rémunérée à l’Université de Lausanne (CDI, CDD ; missions temporaires, gain intermédiaire) ne participent pas au tirage au sort. <br />
          <br />
          Les autres participants feront partie d'un tirage au sort dont le prix est de CHF 2000 par virement bancaire.<br />
          <br />
          Au cours de cette étude, vous serez sollicité pour utiliser l’outil mis à votre
          disposition et répondre à des questionnaires. Chaque utilisation de l’outil et chaque
          participation aux questionnaires rapportent des billets pour le tirage au sort final. Plus
          vous participerez, plus vous collecterez des billets, plus vos chances de gagner au tirage
          au sort seront grandes. Voici la répartition des billets :
          <ul>
            <li>
              Inscription au projet J4U sur le site j4u.unil.ch (avant la date butoir indiquée dans
              l’email) : 10 billets
            </li>
            <li>
              Participation à l’enquête sur le site j4u.unil.ch (avant la date butoir indiquée dans
              l’email) : 10 billets
            </li>
            <li>
              Participation aux questionnaires reçus par email (avant la date butoir indiquée dans
              l’email) : 5 billets / questionnaire
            </li>
            <li>
              Utilisation du site j4u.unil.ch (onglets « recommandations professionnelles » ou «
              recherche d’emploi ») : 3 billets/ jour
            </li>
          </ul>
          <br />
          En cas de désinscription, seuls les billets déjà récoltés compteront pour le tirage au sort. <br />
          Le gagnant de la loterie sera notifié par email dans les quelques jours qui suivent la fin du projet.
        </Paragraph>

        <Paragraph>
          <strong>8. Droits des participants</strong>
          <br />
          Vous prenez part à cette étude uniquement de façon volontaire. Vous êtes libre d’y participer ou non.
          Vous pouvez à tout moment poser toutes les questions nécessaires au sujet de l’étude. 
          Pour ce faire, veuillez-vous adresser au contact indiqué à la fin de la présente feuille d’information.
        </Paragraph>

        <Paragraph>
          <strong>9. Financement de l'étude</strong>
          <br />
          Ce projet est financé par les Fonds National Suisse de la recherche Scientifique. Le
          numéro de fonds est le 100018_178878, géré par Prof. R. Lalive (UNIL).
        </Paragraph>

        <Paragraph>
          <strong>10. Lien avec votre suivi ORP et vos formulaires de preuves de recherches d’emploi de l’ORP</strong>
          <br />
          Cette étude est sans lien direct avec votre suivi au sein de l’ORP. Vos formulaires de recherches d’emploi devront lui être remis selon les objectifs de suivi définis avec votre conseillère ou votre conseiller ORP. <br />
          <br />
          Cette étude vous proposera en revanche de postuler à des offres d’emploi supplémentaires pouvant potentiellement être plus éloignées de celles acceptées par l’ORP. <br />
          <br />
          Nous vous encourageons néanmoins à tester ces propositions puisqu’elles peuvent être mieux adaptées à vos compétences et à votre personnalité, tout en gardant à l’esprit qu’elle ne se substituent pas à celles demandées par l’ORP. <br />
          <br />
        </Paragraph>

        <Paragraph>
          <strong>11. Interlocuteur(s)</strong>
          <br />
          Vous pouvez à tout moment poser vos questions et demander des précisions complémentaires à
          l’adresse suivante : <a href="mailto:j4u@unil.ch">j4u@unil.ch</a>. Notre équipe se fera un
          plaisir de répondre.
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
