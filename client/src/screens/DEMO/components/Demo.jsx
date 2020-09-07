import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getAllImages } from "../../../redux/actions";
import "../assets/css/demo.scss";
import { Row, Col } from "antd";

const Demo = ({ getAllImages, images, ...props }) => {
  useEffect(() => {
    getAllImages({ skip: 0, limit: 250 });
  }, []);

  return (
    <div className="container-demo">
      <div className="header">
        <h3>Photos</h3>
        <div className="right-header">
          <h4>Uploads</h4>
          <h4>Uploads</h4>
        </div>
      </div>
      <div className="content-demo">
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          {images &&
            images.documents &&
            images.documents.map((item) => (
              <Col className="gutter-row" span={6} className="col-image">
                <div className="content-image">
                  <img src={item.raw} alt="Image" className="image-list" />
                  <h5>{item.name}</h5>
                  <p>{item.album}</p>
                </div>
              </Col>
            ))}
        </Row>
      </div>
    </div>
  );
};

const mapActionToProps = {
  getAllImages,
};
const mapStateToProps = (state) => {
  return {
    images: state.image.images,
  };
};

export default connect(mapStateToProps, mapActionToProps)(Demo);
