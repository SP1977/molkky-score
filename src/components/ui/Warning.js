import { useMolkky } from "../contexts/MolkkyContext";

function Warning() {
	const { message } = useMolkky();

	if (!message) return null;

	return (
		<div className="warning-block">
			<p className="warning">{message}</p>
		</div>
	);
}

export default Warning;
