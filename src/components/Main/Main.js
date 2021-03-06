import React, { Fragment } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Carousel } from "react-bootstrap";
import InfiniteCarousel from "react-leaf-carousel";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "react-bootstrap";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import moment from "moment-with-locales-es6";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

const Main = () => {
  const [DataUmum, setDataUmum] = useState(0);
  const [DataGallery, setDataGallery] = useState(null);
  const [CustomDataGallery, setCustomDataGallery] = useState(null);
  const [dataKategori, setDataKategori] = useState();
  const [DataDokumen, setDataDokumen] = useState();
  const [ArtikelByKategori, setArtikelByKategori] = useState();
  const axios = require("axios");
  const [getData] = useState();
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [DataArticle, setDataArticle] = useState(null);
  const [DataKepala, setDatakepala] = useState([]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  useEffect(() => {
    axios
      .get(
        "http://adminmesuji.embuncode.com/api/article?instansi_id=21&per_page=4"
      )
      .then(function (repsonse) {
        setDataArticle(repsonse.data.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    getDataNews();
  }, []);

  // function gettingData(page, slug, title) {
  //   let urlTitle = "";
  //   if (title != null) {
  //     urlTitle = "&title=" + title;
  //   } else {
  //     urlTitle = "";
  //   }
  //   setDataTerbaru(null);
  //   let url = "";
  //   if (slug == null) {
  //     url = "http://adminmesuji.embuncode.com/api/news?instansi_id=21" + urlTitle + "&per_page=4&page=" + page; //clue
  //   } else {
  //     url = "http://adminmesuji.embuncode.com/api/news?instansi_id=21" + urlTitle + "&per_page=4&slug=" + slug + "&page=" + page; //clue
  //   }

  function getDataNews(slug,title) {
    let urlTitle = "";
    if (title != null) {
      urlTitle = "&title=" + title;
    } else {
      urlTitle = "";
    }

    let url = "";

    if (slug == null) {
      // slug = "s";
      url =
        "http://adminmesuji.embuncode.com/api/news?instansi_id=21"+ urlTitle +"&per_page=6";
    } else {
      url =
        "http://adminmesuji.embuncode.com/api/news?instansi_id=21"+urlTitle +"&slug=" + slug;
    }
    setDataUmum(null);
    axios
      .get(url)
      .then(function (Umum) {
        setDataUmum(Umum.data.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  function handleSearchChange(value) {
    console.log("value", value.target.value);
    if (value.key === "Enter") {
      console.log("do validate");
      getDataNews(null,value.target.value);
    }
  }
  useEffect(() => {
    axios
      .get(
        "http://adminmesuji.embuncode.com/api/image-gallery?instansi_id=21&per_page=4"
      )
      .then(function (Umum) {
        setDataGallery(Umum.data.data.data);
        test(Umum.data.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    console.log("Masuk");
    axios
      .get("http://adminmesuji.embuncode.com/api/news/categories/21")
      .then(function (response) {
        setDataKategori(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get("http://adminmesuji.embuncode.com/api/dokumen?instansi_id=21")
      .then(function (response) {
        setDataDokumen(response.data.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    axios
      .get("http://adminmesuji.embuncode.com/api/instansi/detail/21")
      .then(function (kepala) {
        setDatakepala(kepala.data.data);
        test(kepala.data.data);
        console.log("first", kepala.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  function test(response) {
    let imageContainer = [];
    for (let i = 0; i < response.length; i++) {
      for (let k = 0; k < response[i].image_gallery_item.length; k++) {
        imageContainer.push(response[i].image_gallery_item[k].image_file_data);
      }
    }

    setCustomDataGallery(imageContainer);
  }

  useEffect(() => {}, [CustomDataGallery]);

  useEffect(() => {}, []);

  function handleArticleChange(artikelSlug) {
    console.log("artikelSlug", artikelSlug);
    getDataNews(artikelSlug);
    setArtikelByKategori(artikelSlug);
  }

  // function handleSearchChange(value) {
  //   console.log("value", value.target.value);
  //   if (value.key === "Enter") {
  //     console.log("do validate");
  //     gettingData(1, null, value.target.value);
  //   }
  // }

  return (
    <Fragment>
      <div className="container-slideshow">
        <Carousel fade>
          {DataArticle &&
            DataArticle.map((item, index) => {
              return (
                <Carousel.Item>
                  <img
                    className="slideshow"
                    src={item.image_file_data}
                    alt="First slide"
                  />
                  <Carousel.Caption>
                    <h3>{item.title}</h3>
                    <p>{item.intro}</p>
                  </Carousel.Caption>
                </Carousel.Item>
              );
            })}
        </Carousel>
      </div>
      <div className="container-home-main">
        <div className="row mb-5">
          <div className="col-md-4">
            <img
              src={DataKepala.foto_kepala}
              width={"100%"}
              className="foto-kepala"
              alt="Foto Kepala"
            />
          </div>
          <div className="col-md-8 rest">
            <h2 className="kata-pembuka-news">Badan Pendanaan Daerah</h2>
            <p>Tentang Instansi</p>
            <p>{DataKepala.tentang}</p>
            <div className="nama-kpla">
              <h2 className="kata-penutup-news">
                Badan Pendanaan Daerah
              </h2>
              <h2 className="kepala-dinas">{DataKepala.nama_kepala}</h2>
            </div>
          </div>
        </div>
        <div className="row content-home">
          <div className="col-md-9">
            <h2 className="berita title-home-news">Berita Terbaru</h2>
            <div className="row">
              {DataUmum &&
                DataUmum.map((item, index) => {
                  return (
                    <>
                      <>
                        <div className="col-lg-12 col-xl-4">
                          <Card className="isi no-padding">
                            <Card.Body>
                              <div className="border-meta">
                                <Link to="#" className="read-more-size">
                                  <i className="fa-solid fa-calendar-days"></i>
                                  {moment(item.created_at).format(
                                    "Do MMMM  YYYY"
                                  )}
                                </Link>
                                <Link to="#" className="read-more-size">
                                  <i className="fa-solid fa-user"></i>
                                  {item.created_by}
                                </Link>

                                <Link to="#" className="read-more-size x-eyes">
                                  <i className="fa-solid fa-eye"></i>
                                  {item.total_hit}
                                </Link>
                                <Link to="#" className="read-more-size">
                                  <i className="fa-solid fa-tags"></i>
                                  {item.news_category_id}
                                </Link>
                              </div>
                              <Card.Img
                                variant="top"
                                className="radius-10"
                                src={item.image_file_data}
                              />
                              <Card.Title>{item.title}</Card.Title>
                              <Card.Text>{item.intro}</Card.Text>
                              <Link to={"/news/" + item.id}>
                                Read More
                              </Link>
                            </Card.Body>
                          </Card>
                        </div>
                      </>
                    </>
                  );
                })}
            </div>
          </div>
          <div className="col-md-3">
            <h2 className="berita title-home-news">Kategori Berita</h2>
            <ListGroup as="ol" numbered>
              {dataKategori &&
                dataKategori.map((item, index) => {
                  return (
                    <>
                      {ArtikelByKategori === item.slug ? (
                        <ListGroup.Item
                          as="li"
                          onClick={() => handleArticleChange(item.slug)}
                          className="d-flex justify-content-between align-items-start kategori-list-article kategori-list-article-active"
                        >
                          <div className="ms-2 me-auto">
                            <div className="fw-bold">{item.nama_kategori}</div>
                          </div>
                          <Badge variant="primary" pill>
                            {item.news_count}
                          </Badge>
                        </ListGroup.Item>
                      ) : (
                        <ListGroup.Item
                          as="li"
                          onClick={() => handleArticleChange(item.slug)}
                          className="d-flex justify-content-between align-items-start kategori-list-article"
                        >
                          <div className="ms-2 me-auto">
                            <div className="fw-bold">{item.nama_kategori}</div>
                          </div>
                          <Badge variant="primary" pill>
                            {item.news_count}
                          </Badge>
                        </ListGroup.Item>
                      )}
                    </>
                  );
                })}
            </ListGroup>
            <h2 className="berita1 title-home-news">Dokumen</h2>
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              {DataDokumen &&
                DataDokumen.map((item, index) => {
                  return (
                    <>
                      {item.dokumen_item.map((item2, index2) => {
                        return (
                          <Fragment>
                            <ListItem alignItems="flex-start">
                              <ListItemAvatar>
                                <Avatar alt=" " src="./pdf.png" />
                              </ListItemAvatar>
                              <ListItemText
                                primary={
                                  <a
                                    href={
                                      "/pdf/" +
                                      item.slug +
                                      "/" +
                                      item2.dokumen_file_name.replace(/\s/g, "")
                                    }
                                  >
                                    {item2.dokumen_file_name}
                                  </a>
                                }
                                secondary={
                                  <React.Fragment>
                                    <Typography
                                      sx={{ display: "inline" }}
                                      component="span"
                                      variant="body2"
                                      color="text.primary"
                                    >
                                      {item2.created_by}
                                    </Typography>
                                    {
                                      <p>
                                        Created On:{" "}
                                        {
                                          (moment.locale("id-ID"),
                                          moment(item.created_at).format("ll"))
                                        }
                                      </p>
                                    }
                                  </React.Fragment>
                                }
                              />
                            </ListItem>
                          </Fragment>
                        );

                        // <a href={item2.dokumen_file_data}>{item2.dokumen_file_name}</a>;
                      })}
                    </>
                  );
                })}
            </List>
            <ListGroup>
              <div className="col-md-15">
                <h2 className="berita title-home-news">Cari Berita</h2>
                <input
                  onKeyDown={handleSearchChange}
                  className="form-control"
                  type="text"
                  placeholder="Cari Berita"
                 
                />
              </div>
            </ListGroup>
          </div>
        </div>
        <div className="row content-gallery">


        <h2 className="berita title-home-news">Gallery</h2>
        {CustomDataGallery != null ? (
          <InfiniteCarousel
            className="galeri"
            breakpoints={[
              {
                breakpoint: 500,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
                },
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 3,
                },
              },
            ]}
            dots={true}
            showSides={true}
            sidesOpacity={0.5}
            sideSize={0.1}
            slidesToScroll={5}
            slidesToShow={4}
            scrollOnDevice={true}
          >
            {CustomDataGallery.map((item, index) => {
              return (
                <div>
                  <img src={item} />
                </div>
              );
            })}
          </InfiniteCarousel>
        ) : (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        )}
        </div>
      </div>
    </Fragment>
  );
};

export default Main;
