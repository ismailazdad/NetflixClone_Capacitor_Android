import {TEXT_COLLAPSE_OPTIONS} from "../../utils/hooks";
import React from "react";
import ReactTextCollapse from "react-text-collapse";

function ActorBio({id, name, place_of_birth, biography, birthday, gender, profession, imageUrl}) {
    TEXT_COLLAPSE_OPTIONS.minHeight = 50;
    TEXT_COLLAPSE_OPTIONS.maxHeight = 150;

    function calcAge(dateString) {
        var birthday = +new Date(dateString);
        return ~~((Date.now() - birthday) / (31557600000));
    }

    return (
        <div>
            <div>

                <div style={{lineHeight: '1.4rem', marginTop: '1vh', margin: '1vh'}}>
                    <div style={{float: 'right', border: 'solid 1px gray'}}>
                        <img width='100vh' height='100vh' src={imageUrl} onError={e => e.target.display = 'none'}/>
                    </div>
                    {/*<div><span style={{color: 'gray'}}>Id</span> : {data?.id}</div>*/}
                    {name ?
                        <div>
                            <span style={{color: 'gray'}}>Name</span> : <span>{name}</span>
                        </div>
                        : ''}
                    {place_of_birth ?
                        <div>
                            <span style={{color: 'gray'}}>Place of birth</span> : <span>{place_of_birth}</span>
                        </div>
                        : ''}
                    {birthday ?
                        <div>
                            <div>
                                <span style={{color: 'gray'}}>Birthday</span> : <span>{birthday}</span>
                            </div>
                            <div>
                                <span style={{color: 'gray'}}>Age</span> : <span>{calcAge(birthday)}</span>
                            </div>
                        </div>
                        : ''}
                    {gender ?
                        <div>
                            <span
                                style={{color: 'gray'}}>gender</span> : <span>{gender === 0 ? 'no specified' : gender === 1 ? 'woman' : 'men'}</span>
                        </div>
                        : ''}
                    {profession ?
                        <div>
                            <span style={{color: 'gray'}}>profession</span> : <span>{profession}</span>
                        </div>
                        : ''}
                    {biography ?
                        <div className="row justify-content-center align-self-center">
                            <span style={{color: 'gray'}}>Bipgraphy:</span>
                            <div key={id + '_container'} style={{display: "inline-block"}}>
                                {biography.length > 400 ?
                                    <ReactTextCollapse options={TEXT_COLLAPSE_OPTIONS}>
                                        <div style={{textTransform: 'inherit', position: 'relative'}}>{biography}</div>
                                    </ReactTextCollapse>
                                    :
                                    <div style={{textTransform: 'inherit', position: 'relative'}}>{biography}</div>
                                }
                            </div>
                        </div> : ''}
                </div>
            </div>
        </div>
    )
}

export default ActorBio;