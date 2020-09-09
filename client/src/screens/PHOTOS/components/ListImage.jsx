import React, { useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";
import {
  getAllImages,
  uploadImages,
  deleteImages,
} from "../../../redux/actions";
import "../assets/css/index.scss";
import { Row, Col, Modal, Upload, Select, Checkbox } from "antd";
import { CloudUploadOutlined, DeleteOutlined } from "@ant-design/icons";

const { Option } = Select;

const ListImage = ({ getAllImages, images, uploadImages, deleteImages }) => {
  const arrAlbums = ["Travel", "Personal", "Food", "Nature", "Other"];
  const [visible, setVisible] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const [valueAlbum, setValueAlbum] = useState("");
  const [listSelectImage, setListSelectImage] = useState([]);
  const [valueChange, setValueChange] = useState(25);
  const [arrImage, setArrImage] = useState([]);
  const [isLoadmore, setIsLoadmore] = useState(true);
  const [isSelect, setIsSelect] = useState(false);
  const current = valueChange;

  const getAllListImages = useCallback(() => {
    getAllImages({ skip: 0, limit: 25 });
  }, [getAllImages]);

  useEffect(() => {
    getAllListImages();
  }, [getAllListImages]);

  useEffect(() => {
    if (images && images.documents) {
      if (!isSelect) {
        setArrImage([...arrImage, ...images.documents]);
      } else {
        setArrImage(images.documents);
      }
    }

    if (images.count === 0 || images.count < images.limit) {
      setIsLoadmore(false);
    } else {
      setIsLoadmore(true);
    }
  }, [images]);

  const showModalUpload = () => {
    setVisible(true);
  };

  const handleCancel = (e) => {
    setVisible(false);
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleCancelReview = () => setPreviewVisible(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewVisible(true);
    setPreviewImage(file.url || file.preview);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const uploadImage = async () => {
    let fd = new FormData();
    fd.append("album", valueAlbum);
    fileList.map((item) => {
      return fd.append("documents", item.originFileObj);
    });
    await uploadImages(fd)
      .then((res) => {
        const imgs = res.data.data.map((item) => {
          return {
            ...item,
            raw: item.raw.replace(
              "http://http://localhost:3000",
              "http://localhost:8888"
            ),
          };
        });
        res.data && setArrImage([...imgs, ...arrImage]);
        if (res.data.message === "OK") {
          setVisible(false);
          setFileList([]);
          setValueAlbum("");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const uploadButton = (
    <div>
      {/* <PlusOutlined /> */}
      <div style={{ marginTop: 8 }}>
        Drag 'n' drop some files here, or click to select files.
      </div>
    </div>
  );

  const handleChangeAlbums = (value) => {
    setValueAlbum(value);
  };

  const deletePhotos = async () => {
    const arrAlbums = [];
    listSelectImage.map((item) => {
      const data = {
        album: item.album,
        documents: item.name,
      };
      return arrAlbums.push(data);
    });

    await deleteImages(arrAlbums);
    setListSelectImage([]);
    setArrImage(arrImage.filter((item) => !listSelectImage.includes(item)));
  };

  const selectImage = (item) => {
    if (!listSelectImage.includes(item)) {
      setListSelectImage([...listSelectImage, item]);
    } else {
      const arr = listSelectImage.filter((i) => i !== item);
      setListSelectImage([...arr]);
    }
  };

  const loadMore = async () => {
    setIsSelect(false);
    await getAllImages({ skip: valueChange, limit: valueChange });
    setValueChange(+valueChange + +current);
  };

  const handleChangeSelect = async (value) => {
    setIsSelect(true);
    setValueChange(value);
    await getAllImages({ skip: 0, limit: value });
  };

  return (
    <div className="container-demo">
      <div className="header">
        <h3>Photos</h3>
        <div className="right-header">
          {listSelectImage.length !== 0 && (
            <div className="delete-space">
              <DeleteOutlined className="icon-upload" />
              <h4 onClick={deletePhotos}>
                Delete {listSelectImage.length} photos
              </h4>
            </div>
          )}

          <div className="upload-space ">
            <CloudUploadOutlined className="icon-upload" />
            <h4 onClick={showModalUpload}>Upload</h4>
          </div>
          <Select
            defaultValue="25"
            style={{ width: 100 }}
            onChange={handleChangeSelect}
          >
            <Option value="25">25</Option>
            <Option value="50">50</Option>
            <Option value="100">100</Option>
          </Select>
        </div>
        <Modal
          className="modal-upload"
          title="Upload Photos"
          visible={visible}
          onCancel={handleCancel}
          footer={null}
        >
          <Upload
            accept="image/*"
            multiple
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {fileList.length >= 8 ? null : uploadButton}
          </Upload>
          <Modal
            visible={previewVisible}
            title={previewTitle}
            footer={null}
            onCancel={handleCancelReview}
          >
            <img alt="example" style={{ width: "100%" }} src={previewImage} />
          </Modal>
          <div className="bottom-upload-image">
            <Select
              defaultValue="Select Album"
              style={{ width: 200 }}
              onChange={handleChangeAlbums}
            >
              {arrAlbums.map((item, key) => (
                <Option key={key} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
            <div
              className={`${
                valueAlbum && fileList.length ? "" : "disable-upload"
              } upload-space upload-space-modal`}
            >
              <CloudUploadOutlined className="icon-upload" />
              <h4 onClick={uploadImage}>Upload</h4>
            </div>
          </div>
        </Modal>
      </div>
      <div className="content-demo">
        <Row type="flex" gutter={16}>
          {arrImage &&
            arrImage.map((item, key) => (
              <Col key={key} className="col-image">
                <div className="content-image">
                  <div>
                    <img
                      src={item.raw}
                      onClick={() => selectImage(item)}
                      alt={item.raw}
                      className={`${
                        listSelectImage.length &&
                        !listSelectImage.includes(item)
                          ? "no-select-image"
                          : ""
                      } image-list`}
                    />
                    <h5>{item.name}</h5>
                    <p>{item.album}</p>
                  </div>
                  <div
                    className="checkbox-image"
                    style={{
                      display: listSelectImage.includes(item)
                        ? "block"
                        : "none",
                    }}
                  >
                    <Checkbox checked></Checkbox>
                  </div>
                </div>
              </Col>
            ))}
        </Row>
      </div>
      <div>
        <button
          style={!isLoadmore ? { display: "none" } : { display: "block" }}
          className="btn"
          onClick={loadMore}
        >
          Load More
        </button>
      </div>
    </div>
  );
};

const mapActionToProps = {
  getAllImages,
  uploadImages,
  deleteImages,
};
const mapStateToProps = (state) => {
  return {
    images: state.image.images,
  };
};

export default connect(mapStateToProps, mapActionToProps)(ListImage);
