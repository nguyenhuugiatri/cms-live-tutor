import { Avatar, Col, Row, Typography, Affix, Rate, Skeleton } from 'antd';
import Image from 'app/components/Image';
import TextHighlight from 'app/components/TextHighlight';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useInjectReducer, useInjectSaga } from 'utils/reduxInjectors';
import useHooks from './hooks';
import saga from './saga';
import { reducer, sliceKey } from './slice';
import {
  StyledAvatar,
  StyledProfile,
  StyledTutorContent,
  StyledTutorDetail,
  StyledTutorTitle,
  StyledTutorName,
} from './styles';
import COUNTRIES from 'utils/countries';
import { ACTION_STATUS } from 'utils/constants';
import { MAJOR_NAMES } from 'utils/major';
import LANGUAGES from 'utils/languages';
import ConfirmButton from 'app/components/ConfirmButton';

const { Title } = Typography;

export const TutorDetail = ({ ...rest }) => {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });
  const { handlers, selectors } = useHooks();
  const { t } = useTranslation();

  const { tutorDetail, getTutorDetailStatus } = selectors;
  const { onDeny, onApproval } = handlers;
  const userInfo = tutorDetail.User ?? {};

  const { avatar, country, name } = userInfo;

  const {
    bio,
    languages,
    specialties,
    interests,
    video,
    avgRating,
    experience,
  } = tutorDetail;
  const rating = Math.floor(avgRating * 2) / 2.0;

  return (
    <StyledTutorDetail {...rest}>
      <Row justify="center">
        <Col lg={16} md={20} sm={24}>
          <StyledProfile>
            <Row className="profile-form">
              <Affix offsetTop={0} className="w-100">
                <StyledTutorTitle {...rest}>
                  {(getTutorDetailStatus === ACTION_STATUS.PENDING && (
                    <Skeleton avatar active paragraph={{ rows: 2 }} />
                  )) || (
                    <>
                      <div class="ribbon ribbon-top-left">
                        <div>
                          <span>
                            {new Intl.NumberFormat('vi-VN', {
                              style: 'currency',
                              currency: 'VND',
                            }).format(tutorDetail?.price)}
                          </span>
                        </div>
                      </div>
                      <Col>
                        <Row className="tutor-info">
                          <StyledAvatar>
                            <Avatar
                              src={avatar}
                              shape="circle"
                              size={110}
                              className="avatar"
                            />
                          </StyledAvatar>
                          <Row align="middle">
                            <Col className="group-info">
                              <StyledTutorName>{name}</StyledTutorName>
                              {(rating && (
                                <Row align="middle">
                                  <Rate
                                    disabled
                                    value={rating}
                                    className="rate"
                                  />
                                  <span
                                    style={{
                                      fontStyle: 'italic',
                                      color: 'rgb(0 0 0 / 0.6)',
                                    }}
                                  >
                                    {`(${tutorDetail?.User?.feedbacks?.length})`}
                                  </span>
                                </Row>
                              )) || (
                                <span
                                  style={{
                                    fontStyle: 'italic',
                                    color: 'rgb(0 0 0 / 0.6)',
                                  }}
                                >
                                  {t('Profile.noFeedback')}
                                </span>
                              )}
                              <Row className="country">
                                <Image
                                  preview={false}
                                  src={`https://www.countryflags.io/${tutorDetail?.User?.country}/flat/32.png`}
                                />
                                <Title
                                  level={5}
                                  className="d-flex align-items-center"
                                >
                                  {COUNTRIES[country]}
                                </Title>
                              </Row>
                            </Col>
                          </Row>
                        </Row>
                      </Col>
                      <Col>
                        {!tutorDetail?.isActivated && (
                          <div className="d-flex">
                            <ConfirmButton
                              title="Are you sure deny this user?"
                              onConfirm={onDeny}
                              text="Deny"
                              type="primary"
                              style={{ marginRight: '8px' }}
                            />
                            <ConfirmButton
                              title="Are you sure approval this user?"
                              onConfirm={onApproval}
                              text="Approve"
                              type="accent"
                            />
                          </div>
                        )}
                      </Col>
                    </>
                  )}
                </StyledTutorTitle>
              </Affix>
              <StyledTutorContent {...rest}>
                {(getTutorDetailStatus === ACTION_STATUS.PENDING &&
                  [...Array(5)].map((_, index) => (
                    <Skeleton key={index} active paragraph={{ rows: 2 }} />
                  ))) || (
                  <>
                    <Row className="mb-4 intro-video-section">
                      <video
                        className="video-tutor"
                        src={video}
                        controlsList="nodownload"
                        controls
                      />
                    </Row>
                    <div className="intro-section">
                      <StyledTutorName className="name">{name}</StyledTutorName>
                      <Title className="bio" level={5}>
                        {bio}
                      </Title>
                      {/* <Row justify="space-around">
                        <div className="function-icon-group">
                          <MessageOutlined className="function-icon" />
                          <span> {t('Profile.message')}</span>
                        </div>

                        <div className="function-icon-group">
                          <MoreOutlined className="function-icon" />
                          <span> {t('Profile.more')}</span>
                        </div>
                      </Row> */}
                    </div>

                    <Row className="intro-about flex-column">
                      <div className="part">
                        <Title level={5} className="part-title">
                          {t('Profile.about')}
                        </Title>
                        <Title className="part-content" level={5}>
                          {bio}
                        </Title>
                      </div>

                      <div className="part">
                        <Title level={5} className="part-title">
                          {t('Profile.languages')}
                        </Title>
                        <Row className="part-content">
                          {languages?.split(',')?.map(content => (
                            <TextHighlight
                              content={LANGUAGES[content]}
                              key={content}
                            />
                          ))}
                        </Row>
                      </div>
                      <div className="part">
                        <Title className="part-title" level={5}>
                          {t('Profile.specialties')}
                        </Title>
                        <Row className="part-content">
                          {specialties?.split(',')?.map(key => (
                            <TextHighlight
                              content={
                                t('Common.default') === t('Common.vn')
                                  ? MAJOR_NAMES[key]?.vietnameseName
                                  : MAJOR_NAMES[key]?.englishName
                              }
                              key={key}
                            />
                          ))}
                        </Row>
                      </div>
                      <div className="part">
                        <Title className="part-title" level={5}>
                          {t('Profile.interests')}
                        </Title>
                        <Title className="part-content" level={5}>
                          {interests}
                        </Title>
                      </div>
                      <div className="part last-part">
                        <Title className="part-title" level={5}>
                          {t('Profile.teachExperience')}
                        </Title>
                        <Title className="part-content" level={5}>
                          {experience}
                        </Title>
                      </div>
                    </Row>
                  </>
                )}
              </StyledTutorContent>
            </Row>
          </StyledProfile>
        </Col>
      </Row>
    </StyledTutorDetail>
  );
};

export default memo(TutorDetail);
