import { useCallback, useEffect, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import Select, { components } from 'react-select';
import { apiList } from '../../assets/config';

import capitalizeFirstLetter from '../Common';
import Description from '../Description/Description';

import PokemonCard from '../PokemonCard/PokemonCard';
import './Search.scss';

const Option = (props) => {
  return (
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />{' '}
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};

const Search = () => {
  const [searchInput, setSearchInput] = useState('');
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonSearched, setPokemonSearched] = useState({});
  const [typeDropDown, setTypeDropDown] = useState([]);
  const [typeSelected, setTypeSelected] = useState([]);
  const [allTypes, setAllTypes] = useState([]);
  const [displayModal, setDisplayModal] = useState(false);
  const [modalData, setModalData] = useState({});

  const selectStyles = {
    control: (styles) => ({ ...styles, backgroundColor: '#c9dde2' }),
  };

  const fetchPokemonList = useCallback(async () => {
    try {
      const response = await fetch(apiList?.pokemon);
      const data = await response.json();

      const pokemonDetailsPromise = data.results.map((pokemon) => {
        return fetch(pokemon.url);
      });

      Promise.all(pokemonDetailsPromise)
        .then((response) => Promise.all(response.map((res) => res.json())))
        .then((obj) => {
          const allTypeList = [];
          obj.forEach((pokemon) => {
            pokemon.types.forEach((type) => {
              allTypeList.push(type.type.name);
            });
          });

          setAllTypes(allTypeList);
          setPokemonList(obj);
        });
    } catch (error) {}
  }, []);

  const typeSelectedHandler = (val) => {
    setTypeSelected(val);
  };

  useEffect(() => {
    fetchPokemonList();
  }, [fetchPokemonList]);

  useEffect(() => {
    const arr = [...new Set(allTypes)].map((typeName) => {
      return {
        value: typeName,
        label: capitalizeFirstLetter(typeName),
      };
    });
    setTypeDropDown(arr);
  }, [allTypes]);

  const searchPokemonHandler = () => {
    fetch(`${apiList?.pokemon}/${searchInput}`).then((res) => {
      //   setPokemonSearched(res);
      res.json().then((response) => {
        setPokemonList([response]);
      });
    });
  };

  const filterPokemonList = () => {
    let list = [];
    let types = [];
    pokemonList.forEach((pokemon) => {
      if (
        allTypes.includes(pokemon.types[0].type.name) ||
        allTypes.includes(pokemon.types[1].type.name)
      ) {
        list.push({
          imageUrl: pokemon.sprites.other.dream_world.front_default,
          name: capitalizeFirstLetter(pokemon.name),
          id: pokemon.id,
          type:
            pokemon.types.length > 1
              ? [pokemon.types[0].type.name, pokemon.types[1].type.name]
              : [pokemon.types[0].type.name],
        });
      }
    });

    types = typeSelected.map((item) => item.value);

    if (types.length) {
      list = list.filter((item) =>
        item.type.length > 1
          ? types.includes(item.type[0]) || types.includes(item.type[1])
          : types.includes(item.type[0])
      );
    }
    return list.map((pokemon, index) => (
      <div
        onClick={() => {
          setDisplayModal(true);
          setModalData({
            ...pokemonList.find((item) => item.id === pokemon.id),
            ...pokemon,
          });
        }}
        key={index}
      >
        <PokemonCard data={pokemon} />
      </div>
    ));
  };

  return (
    <div>
      <Form className="search-container">
        <div className="search-items">
          <p>Search by</p>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Name or Number"
              id="formSearch"
              onChange={(e) =>
                e.target.value?.length === 0
                  ? fetchPokemonList()
                  : setSearchInput(e.target.value)
              }
            />
            <Button variant="light" onClick={searchPokemonHandler}>
              🔍
            </Button>
          </InputGroup>
        </div>

        <div className="search-criteria">
          <div className="search-items">
            <p>Type</p>
            <Select
              options={typeDropDown}
              isMulti
              closeMenuOnSelect={false}
              hideSelectedOptions={false}
              styles={selectStyles}
              components={{
                Option,
              }}
              onChange={typeSelectedHandler}
              allowSelectAll={true}
              value={typeSelected}
            />
          </div>

          <div className="search-items">
            <p>Gender</p>
            <Select
              options={typeDropDown}
              isMulti
              closeMenuOnSelect={false}
              hideSelectedOptions={false}
              styles={selectStyles}
              components={{
                Option,
              }}
              onChange={typeSelectedHandler}
              allowSelectAll={true}
              value={typeSelected}
              inp
            />
          </div>
        </div>
      </Form>

      <div className="search-list-container">{filterPokemonList()}</div>

      {displayModal ? (
        <Description
          data={{ displayModal, modalData }}
          setDisplayModal={setDisplayModal}
        ></Description>
      ) : null}
    </div>
  );
};

export default Search;
