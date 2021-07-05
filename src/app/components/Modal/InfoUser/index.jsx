import React, { memo } from 'react';
import {
  StyledModal,
  StyledProfile,
  StyledTutorTitle,
  StyledAvatar,
  StyledTutorContent,
  StyledGroupIcon,
} from '../styles';
import TextHighlight from 'app/components/TextHighlight';
import Form from 'app/components/Form';
import { CloseOutlined } from '@ant-design/icons';
import Image from 'app/components/Image';
import Rate from 'app/components/Rate';
import { Row, Col, Avatar } from 'antd';
import { sliceKey, reducer } from './slice';
import { useInjectSaga, useInjectReducer } from 'utils/reduxInjectors';
import saga from './saga';
import { Typography } from 'antd';
import LANGUAGES from 'utils/languages';
import { MAJOR_NAMES } from 'utils/major';
const { Title } = Typography;

const TutorModal = memo(props => {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });
  const { visible, onCancel, tutor, ...rest } = props;
  const {
    avatar,
    bio,
    country,
    languages,
    name,
    resume,
    specialties,
    video,
    interests,
  } = tutor;

  return (
    <StyledModal
      centered
      closable={false}
      visible={visible}
      onCancel={onCancel}
      footer={[]}
      {...rest}
    >
      <StyledProfile>
        <Form
          className="profile-form"
          requiredMark={false}
          // initialValues={userInfo}
          layout="vertical"
        >
          <StyledTutorTitle {...rest}>
            <StyledGroupIcon>
              <CloseOutlined onClick={onCancel} />
            </StyledGroupIcon>
            <Row className="tutor-info">
              <Col flex={0.1}>
                <StyledAvatar>
                  <Avatar
                    src={avatar}
                    shape="circle"
                    size={90}
                    className="avatar"
                  />
                </StyledAvatar>
              </Col>
              <Col className="group-info d-flex justify-content-center">
                <Title level={3}>{name}</Title>
                <Row className="country">
                  <Image
                    preview={false}
                    src={
                      'https://www.cambly.com/static/images/country-flag-icons/US.png'
                    }
                  />
                  <Title level={5} className="d-flex align-items-center">
                    {country}
                  </Title>
                </Row>
              </Col>
            </Row>
          </StyledTutorTitle>
          <StyledTutorContent {...rest}>
            <hr></hr>
            <Row className="mb-4 intro-video-section">
              <video
                className="video-tutor"
                src={video}
                controlsList="nodownload"
                controls
              ></video>
            </Row>
            <Row className="intro-badge">
              <Rate disabled defaultValue={5} className="rate mb-2" />
            </Row>
            <Row className="intro-section">
              <Title level={5}>{bio}</Title>
            </Row>
            <hr></hr>
            <Row className="intro-about flex-column">
              <Title level={4}>About Me</Title>
              <Row>
                <Title level={5}>Languages</Title>
              </Row>
              <Row className="mb-1">
                {languages.split(',').map(content => (
                  <TextHighlight content={LANGUAGES[content]} />
                ))}
              </Row>
              <Row>
                <Title level={5}>Specialties</Title>
              </Row>
              <Row className="mb-1">
                {specialties.split(',').map(content => (
                  <TextHighlight content={MAJOR_NAMES[content]?.englishName} />
                ))}
              </Row>
              <Row>
                <Title level={5}>Interests</Title>
              </Row>
              <Row>
                <Title level={5}>{interests}</Title>
              </Row>
            </Row>
            <hr></hr>
            <Row className="intro-about flex-column">
              <Title level={4}>Resume</Title>
              <Row>
                <Title level={5}>Teaching Experience</Title>
              </Row>
              <Row>
                <Title level={5}>{resume}</Title>
              </Row>
            </Row>
            <hr></hr>
            {/* <Row className="intro-schedule flex-column">
              <Title level={4}>Schedule</Title>
              <Row>
                {isSelectDate && <Title level={5}>Select time a slot</Title>}
                {!isSelectDate && <Title level={5}>Select a day</Title>}
              </Row>
              <Row className="group-tutor-calender">
                {isSelectDate && (
                  <Row className="tutor-calender">
                    <Row
                      className="btn-back pointer align-items-center"
                      onClick={handleBackSelectDate}
                    >
                      <ArrowLeftOutlined /> <span>Back</span>
                    </Row>
                    <Row className="flex-column w-100 p-4">
                      <DatePicker
                        className="w-50 mb-4"
                        defaultValue={moment(moment(), 'YYYY/MM/DD')}
                        format={'YYYY/MM/DD'}
                      />
                      <TimeSelect
                        time={'2:00 AM - 4:00 AM'}
                        disabled
                      ></TimeSelect>
                      <TimeSelect time={'2:00 AM - 4:00 AM'}></TimeSelect>
                      <TimeSelect time={'2:00 AM - 4:00 AM'}></TimeSelect>
                    </Row>
                  </Row>
                )}
                {!isSelectDate && (
                  <Row className="tutor-calender">
                    <Calendar onSelect={onSelectDate} />
                  </Row>
                )}
              </Row>
            </Row> */}
          </StyledTutorContent>
        </Form>
      </StyledProfile>
    </StyledModal>
  );
});

export default TutorModal;
