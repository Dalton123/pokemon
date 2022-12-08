import { nanoid } from "nanoid";
export default function Pokemon(props) {
  return (
    <div className={`pokemon `}>
      <div className="content">
        <div className="title">
          <h3 className="name">{props.name}</h3>
          <span className="id">#{props.id}</span>
        </div>
        <div className="image">
          <img
            className="front"
            src={props.sprites.front_default}
            alt={props.name}
          />
          <img
            className="back"
            src={props.sprites.back_default}
            alt={props.name}
          />
        </div>
        <div className="types">
          {props.types.map((t) => (
            <span key={nanoid()} className={t.type.name}>
              {t.type.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
