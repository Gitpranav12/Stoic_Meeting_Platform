import React, { useState } from "react";
import {
  Mic,
  Volume2,
  Camera,
  Wifi,
  Settings as SettingsIcon,
  X,
} from "lucide-react";
import { Button, Modal, Tabs, Tab, Form, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Settings = ({ show, onClose }) => {
  const [activeTab, setActiveTab] = useState("audio");

  const [audioSettings, setAudioSettings] = useState({
    microphone: "default",
    speaker: "default",
    microphoneVolume: 60,
    noiseCancellation: false,
    echoCancellation: false,
  });

  const [videoSettings, setVideoSettings] = useState({
    camera: "default",
    resolution: "720p",
    mirrorVideo: false,
    showParticipantNames: false,
  });

  const [networkSettings, setNetworkSettings] = useState({
    bandwidth: "auto",
    preferredQuality: "hd",
  });

  const [generalSettings, setGeneralSettings] = useState({
    language: "english",
    notifications: true,
    autoRecord: false,
  });

  const handleSave = () => {
    console.log({
      audioSettings,
      videoSettings,
      networkSettings,
      generalSettings,
    });
    onClose();
  };

  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      dialogClassName="mx-auto"
      contentClassName="rounded-3"
      fullscreen="md-down"
    >
      <Modal.Header className="d-flex flex-wrap align-items-center justify-content-between">
        <Modal.Title className="fs-5 fw-semibold">Settings</Modal.Title>
        <Button
          variant="light"
          onClick={onClose}
          className="border-0 p-1"
        >
          <X size={20} />
        </Button>
      </Modal.Header>

      <Modal.Body className="p-3 p-md-4">
        <Container fluid>
          <Row>
            <Col xs={12}>
              <Tabs
                activeKey={activeTab}
                onSelect={(k) => setActiveTab(k)}
                className="mb-3 flex-wrap"
                justify
              >
                <Tab eventKey="audio" title="Audio">
                  <Form className="pt-2">
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">
                        <Mic size={16} className="me-2" />
                        Microphone
                      </Form.Label>
                      <Form.Select
                        value={audioSettings.microphone}
                        onChange={(e) =>
                          setAudioSettings({
                            ...audioSettings,
                            microphone: e.target.value,
                          })
                        }
                      >
                        <option value="default">Default Microphone</option>
                        <option value="usb">USB Microphone</option>
                        <option value="built-in">Built-in Microphone</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">
                        <Volume2 size={16} className="me-2" />
                        Speaker
                      </Form.Label>
                      <Form.Select
                        value={audioSettings.speaker}
                        onChange={(e) =>
                          setAudioSettings({
                            ...audioSettings,
                            speaker: e.target.value,
                          })
                        }
                      >
                        <option value="default">Default Speaker</option>
                        <option value="built-in">Built-in Speaker</option>
                        <option value="headphones">Headphones</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">
                        Microphone Volume
                      </Form.Label>
                      <Form.Range
                        value={audioSettings.microphoneVolume}
                        onChange={(e) =>
                          setAudioSettings({
                            ...audioSettings,
                            microphoneVolume: parseInt(e.target.value),
                          })
                        }
                      />
                    </Form.Group>

                    <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
                      <Form.Label className="mb-0 fw-semibold">
                        Noise Cancellation
                      </Form.Label>
                      <Form.Check
                        type="switch"
                        checked={audioSettings.noiseCancellation}
                        onChange={(e) =>
                          setAudioSettings({
                            ...audioSettings,
                            noiseCancellation: e.target.checked,
                          })
                        }
                      />
                    </div>

                    <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
                      <Form.Label className="mb-0 fw-semibold">
                        Echo Cancellation
                      </Form.Label>
                      <Form.Check
                        type="switch"
                        checked={audioSettings.echoCancellation}
                        onChange={(e) =>
                          setAudioSettings({
                            ...audioSettings,
                            echoCancellation: e.target.checked,
                          })
                        }
                      />
                    </div>
                  </Form>
                </Tab>

                <Tab eventKey="video" title="Video">
                  <Form className="pt-2">
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">
                        <Camera size={16} className="me-2" />
                        Camera
                      </Form.Label>
                      <Form.Select
                        value={videoSettings.camera}
                        onChange={(e) =>
                          setVideoSettings({
                            ...videoSettings,
                            camera: e.target.value,
                          })
                        }
                      >
                        <option value="default">Default Camera</option>
                        <option value="built-in">Built-in Camera</option>
                        <option value="external">External Camera</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">Resolution</Form.Label>
                      <Form.Select
                        value={videoSettings.resolution}
                        onChange={(e) =>
                          setVideoSettings({
                            ...videoSettings,
                            resolution: e.target.value,
                          })
                        }
                      >
                        <option value="480p">480p</option>
                        <option value="720p">720p (HD)</option>
                        <option value="1080p">1080p (Full HD)</option>
                      </Form.Select>
                    </Form.Group>

                    <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
                      <Form.Label className="mb-0 fw-semibold">Mirror Video</Form.Label>
                      <Form.Check
                        type="switch"
                        checked={videoSettings.mirrorVideo}
                        onChange={(e) =>
                          setVideoSettings({
                            ...videoSettings,
                            mirrorVideo: e.target.checked,
                          })
                        }
                      />
                    </div>

                    <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
                      <Form.Label className="mb-0 fw-semibold">
                        Show Participant Names
                      </Form.Label>
                      <Form.Check
                        type="switch"
                        checked={videoSettings.showParticipantNames}
                        onChange={(e) =>
                          setVideoSettings({
                            ...videoSettings,
                            showParticipantNames: e.target.checked,
                          })
                        }
                      />
                    </div>
                  </Form>
                </Tab>

                <Tab eventKey="network" title="Network">
                  <Form className="pt-2">
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">
                        <Wifi size={16} className="me-2" />
                        Bandwidth Management
                      </Form.Label>
                      <Form.Select
                        value={networkSettings.bandwidth}
                        onChange={(e) =>
                          setNetworkSettings({
                            ...networkSettings,
                            bandwidth: e.target.value,
                          })
                        }
                      >
                        <option value="auto">Auto</option>
                        <option value="low">Low (Save Data)</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group>
                      <Form.Label className="fw-semibold">Preferred Quality</Form.Label>
                      <Form.Select
                        value={networkSettings.preferredQuality}
                        onChange={(e) =>
                          setNetworkSettings({
                            ...networkSettings,
                            preferredQuality: e.target.value,
                          })
                        }
                      >
                        <option value="sd">Standard Definition</option>
                        <option value="hd">High Definition</option>
                      </Form.Select>
                    </Form.Group>
                  </Form>
                </Tab>

                <Tab eventKey="general" title="General">
                  <Form className="pt-2">
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">
                        <SettingsIcon size={16} className="me-2" />
                        Language
                      </Form.Label>
                      <Form.Select
                        value={generalSettings.language}
                        onChange={(e) =>
                          setGeneralSettings({
                            ...generalSettings,
                            language: e.target.value,
                          })
                        }
                      >
                        <option value="english">English</option>
                        <option value="spanish">Spanish</option>
                        <option value="french">French</option>
                        <option value="german">German</option>
                      </Form.Select>
                    </Form.Group>

                    <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
                      <Form.Label className="mb-0 fw-semibold">Enable Notifications</Form.Label>
                      <Form.Check
                        type="switch"
                        checked={generalSettings.notifications}
                        onChange={(e) =>
                          setGeneralSettings({
                            ...generalSettings,
                            notifications: e.target.checked,
                          })
                        }
                      />
                    </div>

                    <div className="d-flex justify-content-between align-items-center flex-wrap">
                      <Form.Label className="mb-0 fw-semibold">Auto-record Meetings</Form.Label>
                      <Form.Check
                        type="switch"
                        checked={generalSettings.autoRecord}
                        onChange={(e) =>
                          setGeneralSettings({
                            ...generalSettings,
                            autoRecord: e.target.checked,
                          })
                        }
                      />
                    </div>
                  </Form>
                </Tab>
              </Tabs>
            </Col>
          </Row>
        </Container>
      </Modal.Body>

      <Modal.Footer className="d-flex flex-wrap justify-content-end gap-2">
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          className="text-white"
          style={{
            background: "linear-gradient(to right, #7B2FF7, #F107A3)",
            border: "none",
          }}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Settings;
