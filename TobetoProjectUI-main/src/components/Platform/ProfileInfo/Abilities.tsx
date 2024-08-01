import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import skillService from "../../../services/skillService";
import Paginate from "../../../models/paginate";
import { FormEvent, useEffect, useState } from "react";
import { GetAllSkill } from "../../../models/response/Skill/getAllSkill";
import AddRequestUserSkill from "../../../models/requests/userSkill/AddRequestUserSkill";
import tokenDecode from "../../../hooks/tokenDecode";
import userSkillService from "../../../services/userSkillService";
import GetAllUserSkill, { defaultGetAllUserSkill } from "../../../models/response/userSkill/GetAllUserSkill";
import { ADDED_SUCCESS, DELETE_SUCCESS } from "../../../contexts/messageContexts";
import toastr from "toastr";

export default function Abilities() {

  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState();
  const [skills, setSkills] = useState<Paginate<GetAllSkill>>({ items: [] });
  const [responseData, setResponseData] = useState<Paginate<GetAllUserSkill>>({ items: [defaultGetAllUserSkill] });
  const [formData, setFormData] = useState<AddRequestUserSkill>(
    {
      UserId: Number(tokenDecode().ID),
      SkillId: 0
    }
  );

  const fetchData = async () => {
    try {
      await userSkillService.getByUserId(tokenDecode().ID).then(
        (res) => {
          if (res.status === 200) {
            setResponseData(res.data)
            console.log(res.data)
          }
        }
      );

    } catch (error) {
      console.error("Veri çekme sırasında bir hata oluştu:", error);
    }
  };


  const fetchSkill = async () => {
    try {
      await skillService.getAll(0, 20).then(
        (res) => {
          if (res.status === 200) {
            setSkills(res.data)
          }
        }
      );

    } catch (error) {
      console.error("Veri çekme sırasında bir hata oluştu:", error);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    userSkillService
      .add(formData)
      .then((res) => {
        if(res.status === 200) {
          toastr.success(ADDED_SUCCESS);
        }   
        fetchData();

      })
      .catch(error => console.log(error))
  };

  const deleteData = async (id: number) => {
    await userSkillService.delete(id)
      .then(() => {
        fetchData();
        handleCloseModal();
        toastr.info(DELETE_SUCCESS)
      })
      .catch(error => console.log(error))
  }

  useEffect(() => {

    fetchSkill();
    fetchData();
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDeleteInfo = (desc: any) => {
    setModalData(desc);
    setShowModal(true);
  };

  return (
    <Col md={9}>
      <Container className="container-lg " style={{ minHeight: "90vh" }}>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-2">
            <div className="col-12 mb-6">
              <label className="form-label">Yetkinlik</label>
              <div className="input-group">
                <Form.Select name="input-group-text" className="form-select tobeto-input" aria-label="" defaultValue=""
                  onChange={e => setFormData({ ...formData, SkillId: Number(e.target.options[e.target.selectedIndex].id) })}>
                  <option value="" disabled>Seçiniz</option>
                  {skills.items.map((skill: any) => (
                    <option key={skill.id} value={skill.id} id={skill.id}>
                      {skill.name}
                    </option>
                  ))}
                </Form.Select>
              </div>
            </div>
          </Row>
          <Button type="submit" className="btn btn-primary py-2 mb-3 d-inline-block mobil-btn">
            Kaydet
          </Button>
        </Form>
        {
          responseData.items.map((data: any) => (
            <Col className="col-12">
              <div className="my-grade" key={data.id}>
                <div className="grade-details">
                  <div className="grade-details-col">
                    <span className="grade-details-content">{data.skillName}</span>
                  </div>
                  <span className=" grade-delete g-del" onClick={() => handleDeleteInfo(data.id)} />
                </div>
              </div>

            </Col>
          ))
        }
        <Modal className='fade alert-modal modal' show={showModal} onHide={handleCloseModal} centered>
          <Modal.Body>
            <div className="mw-xl mx-auto ">
              <div className=" bg-white shadow-lg">
                <div className="alert-header mx-3">
                  <span className="alert-icon" />
                  <span className="alert-close" onClick={handleCloseModal} />
                </div>
                <p className="alert-message mx-3">
                  Seçilen Yetkinliği silmek istediğinize emin misiniz?
                </p>
                <p className="alert-message-light mx-3">Bu işlem geri alınamaz.</p>
                <div className="alert-buttons">
                  <button className="btn btn-no my-3 " onClick={handleCloseModal}>Hayır</button>
                  <button className="btn btn-yes my-3" onClick={() => deleteData(Number(modalData))}>Evet</button>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </Container>
    </Col>
  );
}
