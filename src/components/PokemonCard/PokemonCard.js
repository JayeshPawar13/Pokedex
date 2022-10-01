import { colorScheme } from '../../assets/config';
import './PokemonCard.scss';

const PokemonCard = (props) => {
  return (
    <div
      className="card-body"
      style={
        props.data.type.length > 1
          ? {
              background: `linear-gradient(180deg, ${
                colorScheme[props.data.type[0]]
              } 0%, ${colorScheme[props.data.type[1]]} 100%)`,
            }
          : { backgroundColor: colorScheme[props.data.type[0]] }
      }
    >
      <img className="card-img" src={props.data.imageUrl} alt="Not found"></img>
      <span className="card-title">{props.data.name}</span>
      <span className="card-subtitle">{('00' + props.data.id).slice(-3)}</span>
    </div>
  );
};

export default PokemonCard;
