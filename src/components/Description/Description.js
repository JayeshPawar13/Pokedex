import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { apiList, colorScheme } from '../../assets/config';
import capitalizeFirstLetter from '../Common';
import PokemonCard from '../PokemonCard/PokemonCard';
import './Description.scss';

const HeightConversion = (height) => {
  let feet = (height / 3.048).toString();
  feet = feet.replace('.', "'");
  const index = feet.indexOf("'");
  feet = feet.substring(0, index + 3) + '"';
  return feet;
};

const Description = (props) => {
  const pokemonStats = props.data.modalData.stats?.reduce(
    (prev, next) => ({ ...prev, [next.stat.name]: next.base_stat + '%' }),
    {}
  );
  const [species, setSpecies] = useState({});
  const [weakness, setWeakness] = useState([]);

  const getSpeciesData = (id) => {
    fetch(`${apiList?.species}/${id}`).then((res) =>
      res.json().then((response) => {
        setSpecies({
          eggGroups: response.egg_groups
            .map((item) => capitalizeFirstLetter(item.name))
            .join(', '),
          description: [
            ...new Set(
              response.flavor_text_entries
                .filter((english) => english.language.name === 'en')
                .map((item) => item.flavor_text)
            ),
          ]
            .join(' ')
            .replace(/\n/g, ''),
        });
      })
    );
  };

  const getWeakness = (id) => {
    fetch(`${apiList?.type}/${id}`).then((res) =>
      res.json().then((response) => {
        setWeakness(
          response.damage_relations.double_damage_from.map((item) => item.name)
        );
      })
    );
  };

  useEffect(() => {
    getSpeciesData(props.data.modalData.id);
    getWeakness(props.data.modalData.id);
  }, [props.data.modalData.id]);

  return (
    <Modal
      show={props.data.displayModal}
      onHide={() => props.setDisplayModal(false)}
      dialogClassName="modal-90w "
      aria-labelledby="example-custom-modal-styling-title"
      centered
    >
      <Modal.Body style={{ backgroundColor: '#DEEDED' }}>
        <div className="pokemon-modal-container">
          <div className="pokemon-modal-container__title-mobile">
            <div style={{ textAlignLast: 'justify' }}>
              {props.data.modalData.name.toUpperCase()}{' '}
              <span onClick={() => props.setDisplayModal(false)}>x</span>
            </div>
            <div style={{ fontWeight: '400' }}>
              {('00' + props.data.modalData.id).slice(-3)}
            </div>
          </div>
          <div className="pokemon-modal-container__card">
            <PokemonCard data={props.data.modalData} />
          </div>
          <div className="pokemon-modal-container__description">
            <div className="pokemon-modal-container__title-desktop">
              <span>{props.data.modalData.name.toUpperCase()}</span>
              <span className="vertical-line"></span>
              <span style={{ fontWeight: '400' }}>
                {('00' + props.data.modalData.id).slice(-3)}
              </span>
              <span className="vertical-line"></span>
              <span onClick={() => props.setDisplayModal(false)}>x</span>
            </div>
            {species?.description}
          </div>
        </div>
        <div className="pokemon-char">
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="pokemon-char__title">Height</span>
            <span>{HeightConversion(props.data.modalData.height)}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="pokemon-char__title">Weight</span>
            <span>{props.data.modalData.weight / 10} Kg</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="pokemon-char__title">Gender(s)</span>
            <span>Male / Female</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="pokemon-char__title">Egg Groups</span>
            <span>{species.eggGroups}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="pokemon-char__title">Abilities</span>
            <span>
              {props.data.modalData.abilities?.map((item, index) => {
                if (index === props.data.modalData.abilities.length - 1) {
                  return capitalizeFirstLetter(item.ability.name);
                } else {
                  return capitalizeFirstLetter(item.ability.name) + ', ';
                }
              })}
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="pokemon-char__title">Types</span>
            <div style={{ display: 'flex', gap: '0.2em' }}>
              {props.data.modalData.type?.map((item, index) => (
                <span
                  key={index}
                  className="pokemon-char__type-box"
                  style={{ backgroundColor: colorScheme[item] }}
                >
                  {capitalizeFirstLetter(item)}
                </span>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="pokemon-char__title">Weak Against</span>
            <div style={{ display: 'flex', gap: '0.2em' }}>
              {weakness.map((item, index) => (
                <span
                  key={item}
                  className="pokemon-char__type-box"
                  style={{ backgroundColor: colorScheme[item] }}
                >
                  {capitalizeFirstLetter(item)}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="pokemon-stats">
          <span className="pokemon-stats__title ">Stats</span>
          <div className="pokemon-stats__description">
            <div>
              <div className="pokemon-stats__description-title">
                HP
                <div className="pokemon-stats__progressbar">
                  <div style={{ width: pokemonStats.hp }}></div>
                </div>
              </div>
            </div>
            <div>
              <div className="pokemon-stats__description-title">
                Attack
                <div className="pokemon-stats__progressbar">
                  <div style={{ width: pokemonStats.attack }}></div>
                </div>
              </div>
            </div>
            <div>
              <div className="pokemon-stats__description-title">
                Defense
                <div className="pokemon-stats__progressbar">
                  <div style={{ width: pokemonStats.defense }}></div>
                </div>
              </div>
            </div>
            <div>
              <div className="pokemon-stats__description-title">
                Speed
                <div className="pokemon-stats__progressbar">
                  <div style={{ width: pokemonStats.speed }}></div>
                </div>
              </div>
            </div>
            <div>
              <div className="pokemon-stats__description-title">
                Sp. Attack
                <div className="pokemon-stats__progressbar">
                  <div style={{ width: pokemonStats['special-attack'] }}></div>
                </div>
              </div>
            </div>
            <div>
              <div className="pokemon-stats__description-title">
                Sp. Def.
                <div className="pokemon-stats__progressbar">
                  <div style={{ width: pokemonStats['special-defense'] }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Description;
