import urls from "../../utils/urls";
import { useFetch } from "../../utils/hooks";
import { Loader } from "../../utils/style/Atoms";
import React, { useEffect, useState } from "react";
import { LoaderWrapper } from "../RowBanner";
import styled from "styled-components";
import { Link } from "react-router-dom";
import tvUrls from "../../utils/urls/tv";

export const StyledImage = styled.div`
  object-fit: contain;
  max-height: 200px;
  height: 200px;
  margin-left: 10%;
  margin-right: 10%;
  transition: transform 700ms;
  &:hover {
    transform: scale(1.15);
  }

  max-width: 400px;
  @media only screen and (max-width: 768px) {
    max-height: 20vh;
    height: 20vh;
    max-width: 30vh;
    &:hover {
      transform: scale(1.1);
    }
  }
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

export const RowCasting = styled.div`
  display: flex;
  overflow-y: hidden;
  scroll-behavior: smooth;

  ::-webkit-scrollbar {
    display: none;
    float: right;
  }
`;

const MovieButton = styled.button`
  cursor: pointer;
  color: #fff;
  outline: none;
  border: none;
  font-weight: 700;
  border-radius: 0.2vw;
  padding-left: 2rem;
  padding-right: 2rem;
  margin-right: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  background-color: rgba(51, 51, 51, 0.5);
  width: 15vh;
  @media only screen and (max-width: 768px) {
    margin-top: 1vh;
    margin-left: 1vh;
    margin-right: 1vh;
    height: 5vh;
  }

  &:hover {
    color: #000;
    background-color: #e6e6e6;
    transition: all 0.2s;
  }
`;

function Credits({ id, language, showType }) {
  const url =
      showType && showType === "tv"
          ? tvUrls.findCreditsById.replace("{id}", id)
          : urls.findCreditsById.replace("{id}", id);
  const [isLoading, data] = useFetch(url, false);
  const [initialCrew, setInitialCrew] = useState([]);
  const [initialCast, setInitialCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const [cast, setCast] = useState([]);
  const [imageCheckPerformed, setImageCheckPerformed] = useState(false);

  useEffect(() => {
    if (!data) return;
    let initialCrew = data.crew;
    let initialCast = data.cast;
    if (initialCrew) {
      initialCrew = initialCrew
          .filter((v, i, a) => a.findIndex((v2) => v2.id === v.id) === i)
          .filter((v) => ![
            "Acting",
            "Art",
            "Editing",
            "Lighting",
            "Crew",
            "Sound",
            "Costume & Make-Up",
            "Visual Effects"
          ].includes(v.known_for_department));
    }
    if (initialCast) {
      initialCast = initialCast.filter((v, i, a) => a.findIndex((v2) => v2.id === v.id) === i);
    }
    setInitialCrew(initialCrew);
    setInitialCast(initialCast);
  }, [data]);

  useEffect(() => {
    const checkAndSetCollection = async (collection, setCollectionState, initialState) => {
      if (!collection || imageCheckPerformed) {
        return;
      }

      const updatedCollection = await Promise.all(
          collection.map(async (item) => {
            if (item.profile_path) {
              try {
                const response = await fetch(
                    `${urls.findImagesUrl.replace("original", "w185")}${item.profile_path}`
                )

                if (response.ok) {
                  return item
                }

              } catch (error) {
                console.error("test Error checking image", error);
              }
            }
            return null
          })
      )

      const filteredCollection = updatedCollection.filter((item) => item !== null)
      setCollectionState(filteredCollection.length > 0 ? filteredCollection : initialState)
    };

    if (initialCrew && !imageCheckPerformed) {
      checkAndSetCollection(initialCrew, setCrew, [])
    }
    if (initialCast && !imageCheckPerformed) {
      checkAndSetCollection(initialCast, setCast, [])
    }
  }, [initialCrew, initialCast, imageCheckPerformed])
  const scale = 0.7;
  return (
      <div style={{ height: `${cast && crew && cast?.length > 0 && crew?.length > 0 ? "49vh":
            (cast?.length === 0 || crew?.length ===0) ? "25vh" : "auto"}` }}>
        {isLoading ? (
            <LoaderWrapper data-testid="loader">
              <Loader />
            </LoaderWrapper>
        ) : (
            <div
                style={{
                  transform: `scale(${scale - 0.05})`,
                  transformOrigin: "top left",
                  overflow: "auto",
                  width: `calc(100vh * ${scale})`,
                }}
            >
              {cast && cast?.length > 0 ? (
                  <h2 style={{ marginTop: "1vh" }}>Casting</h2>
              ) : (
                  ""
              )}
              <RowCasting>
                {cast &&
                    cast.map((cast, index) => (
                        <div className="flex-row" key={index + "_container"}>
                          <div
                              style={{
                                whiteSpace: "nowrap",
                                fontSize: "small",
                                marginLeft: "1.5vh",
                                width: "15vh",
                                overflow: "hidden",
                              }}
                          >
                            <h5 style={{ fontSize: "3.3vw", textOverflow: "ellipsis" }}>
                              {cast.name}
                            </h5>
                            <span
                                style={{
                                  fontSize: "3.3vw",
                                  textOverflow: "ellipsis",
                                  overflow: "hidden",
                                }}
                            >
                      "{cast?.character.replace(" (voice)", "")}"
                    </span>
                          </div>
                          <div
                              style={{
                                whiteSpace: "nowrap",
                                fontSize: "small",
                                marginLeft: "1.5vh",
                                width: "15vh",
                                overflow: "hidden",
                                marginBottom: "1vh",
                              }}
                          >
                    <span
                        style={{
                          overflow: "hidden",
                          fontWeight: 500,
                          fontSize: "3.5vw",
                        }}
                    ></span>
                          </div>
                          <StyledImage>
                            <img
                                style={{
                                  maxHeight: "20vh",
                                  height: "20vh",
                                  maxWidth: "30vh",
                                  borderRadius: "25%",
                                }}
                                src={`${urls.findImagesUrl.replace("original", "w185")}${
                                    cast.profile_path
                                }`}
                                alt={cast.name}
                            />
                            <div />
                          </StyledImage>
                          <Link to={`/actor/${cast?.id}/${language}/${showType}`}>
                            <MovieButton>discover</MovieButton>
                          </Link>
                        </div>
                    ))}
              </RowCasting>
              {crew && crew?.length > 0 ? (
                  <h2 style={{ marginTop: "1vh" }}>Production</h2>
              ) : (
                  ""
              )}
              <RowCasting>
                {crew &&
                    crew.map((crew, index) => (
                        <div className="flex-row" key={index + "_container"}>
                          <div
                              style={{
                                whiteSpace: "nowrap",
                                fontSize: "small",
                                marginLeft: "1.5vh",
                                width: "15vh",
                                overflow: "hidden",
                              }}
                          >
                            <h5 style={{ fontSize: "3.3vw", textOverflow: "ellipsis" }}>
                              {crew.name}
                            </h5>
                          </div>
                          <div
                              style={{
                                whiteSpace: "nowrap",
                                fontSize: "small",
                                marginLeft: "1.5vh",
                                width: "15vh",
                                overflow: "hidden",
                                marginBottom: "1vh",
                              }}
                          >
                    <span
                        style={{
                          fontSize: "3.3vw",
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                        }}
                    >
                      {crew.known_for_department}
                    </span>
                          </div>
                          <StyledImage>
                            <img
                                style={{
                                  maxHeight: "20vh",
                                  height: "20vh",
                                  maxWidth: "30vh",
                                  borderRadius: "25%",
                                }}
                                src={`${urls.findImagesUrl.replace("original", "w185")}${
                                    crew.profile_path
                                }`}
                                alt={crew.name}
                            />
                            <div />
                          </StyledImage>
                          {crew?.known_for_department === "Directing" ? (
                              <Link to={`/actor/${crew?.id}/${language}/${showType}`}>
                                <MovieButton>discover</MovieButton>
                              </Link>
                          ) : (
                              ""
                          )}
                        </div>
                    ))}
              </RowCasting>
            </div>
        )}
      </div>
  );
}

export default Credits;
