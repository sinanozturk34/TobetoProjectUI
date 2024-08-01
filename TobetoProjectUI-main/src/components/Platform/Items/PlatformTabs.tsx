import { Container } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import AnnouncementsComponent from "./AnnouncementsComponent";
import ApplicationsComponent from "./ApplicationsComponent";
import EducationComponent from "./EducationComponent";
import SurveyComponent from "./SurveyComponent";
import {  useNavigate } from "react-router-dom";

function PlatformTabs() {

  const navigate =  useNavigate();

  const handleButtonClick1= ()=>{
    navigate('/eğitimlerim');
  }

  const handleButtonClick2= ()=>{
    navigate('/duyurular');
  }

  const handleButtonSurvey= ()=>{
    navigate('/anketler');
  }
   
  return (
    <Container>
      <Tabs
        defaultActiveKey="applications"
        id="justify-tab-example"
        className="nav nav-tabs mainTablist "
        justify
      >
        <Tab eventKey="applications" title="Başvurularım">
          <ApplicationsComponent />
        </Tab>
        <Tab eventKey="courses" title="Eğitimlerim">
          <EducationComponent pageSize={4}/>
            <div className="showMoreBtn" onClick={handleButtonClick1}>Daha Fazla Göster</div>
        </Tab>

        <Tab eventKey="announcements" title="Duyuru ve Haberlerim">
          <AnnouncementsComponent pageSize={3} />
          <div className="showMoreBtn" onClick={handleButtonClick2}>Daha Fazla Göster</div>
        </Tab>
        <Tab eventKey="surveys" title="Anketlerim">
          <SurveyComponent />
          <div className="showMoreBtn" onClick={handleButtonSurvey}>Daha Fazla Göster</div>          
        </Tab>
      </Tabs>
    </Container>
  );
}

export default PlatformTabs;
