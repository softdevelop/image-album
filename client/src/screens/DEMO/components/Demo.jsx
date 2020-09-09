import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getAllImages } from "../../../redux/actions";
import "../assets/css/demo.scss";
import { Row, Col, Select } from "antd";
const { Option } = Select;

const Demo = ({ getAllImages, images, ...props }) => {
  const [valueChange, setValueChange] = useState(25);
  const [arrImage,setArrImage]= useState([])
  const [current, setCurrent] = useState(valueChange);
  useEffect(() => {
    getAllImages({ skip: 0, limit: 25 });
  }, []);
  useEffect(() => {
   if(images && images.documents ) 
    setArrImage([...arrImage,...images.documents]);
  }, [images]);

  const handleChange = async (value) => {
    setValueChange(value);
    await getAllImages({ skip: 0, limit: valueChange });
  };
  const loadMore = async () => {
    await getAllImages({ skip: valueChange, limit: valueChange });
    setValueChange(valueChange+current)
  };
  return (
    <div className="container-demo">
      <div className="header">
        <h3>Photos</h3>
        <div className="right-header">
          <h4>Uploads</h4>
          <Select
            defaultValue="25"
            style={{ width: 100 }}
            onChange={handleChange}
          >
            <Option value="25">25</Option>
            <Option value="50">50</Option>
            <Option value="100">100</Option>
          </Select>
        </div>
      </div>
      <div className="content-demo">
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          {arrImage &&
            // arrImage.documents &&
            arrImage.map((item) => (
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
      <div>
        <button  style={valueChange > 53 ? {display: 'none'} : { display: 'block' }}  className="btn" onClick={loadMore}>
          Load More
        </button>
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
