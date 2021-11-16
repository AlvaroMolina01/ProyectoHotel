<script>
	
	import { db } from "./firebase";
	import {
		collection,
		getDocs,
		doc,
		addDoc,
		updateDoc,
		deleteDoc,
	} from "firebase/firestore";

	let cliente = {
		id : "",
		nombre: "",
		password: ""
	};

	let editar = false;

	let hoteles = [];

	const loadData = async () => {
		const querySnapshot = await getDocs(collection(db, "hoteles"));
		let docs = [];
		querySnapshot.forEach((doc) => {
			docs.push({ ...doc.data(), id: doc.id });
		});
		hoteles = [...docs];
		console.log(hoteles);
	};
	loadData();

	const addCliente = async () => {
		await addDoc(collection(db, 'usuarios'),cliente);
		await loadUsers();
		console.log('new client');
		vaciarFormulario();
		
	};

	const guardarElemento = async () => {
		await updateDoc(doc(db, "usuarios", cliente.id), cliente);
		await loadUsers();
		vaciarFormulario();
	};

	let usuarios = [];

	const loadUsers = async () => {
		const querySnapshot = await getDocs(collection(db, "usuarios"));
		let users = [];
		querySnapshot.forEach((user) => {
			users.push({ ...user.data(), id: user.id });
		});
		usuarios = [...users];
		console.log(usuarios);
	};

	loadUsers();

	const deleteUser = async (id) => {
		await deleteDoc(doc(db, "usuarios", id));
		await loadUsers();
		vaciarFormulario();
	}; 

	const editUser = (us,id) => {
		cliente = Object.assign({}, us);
		editar = true;
		deleteUser(id);
		
	};

	const onSubmitHandler = (e) => {
		if (editar) {
			// Guardamos
			console.log("Guardando...");
			guardarElemento();
		} else {
			addCliente();
		}
	};

	const vaciarFormulario = () => {
		cliente = {
			id : "",
			nombre: "",
			descripcion: "",

		};
		editar = false;
	};

</script>

<main>
	<div class = "general">
		<div class = "dos">
			<h1 class = "tit"> Hoteles Disponibles </h1>
			{#each hoteles as hotel}
			<div class = "b1">
				<div class = "b2">
						<h5>{hotel.Nombre}</h5>
						<p> Precio/noche: {hotel.Precio}</p>
						<p> Estrellas: {hotel.Estrellas}</p>
						<p> Reservado: {hotel.Reservado}</p>
						<button onclick="alert('Tu habitación ha sido reservada')"> Reservar </button>
				</div>
				<div class = "b3">
					<p> <img src ={hotel.Imagen} alt = "imagen no encontrada"></p>
				</div>
			</div>
			{/each}
		</div>
		<div class = "b0">
			<div class = "formu">
				<h1> Formulario de Registro </h1>
				<form action on:submit|preventDefault={onSubmitHandler}>
					<input  bind:value={cliente.nombre} type="text" placeholder="Escribe tu nombre"> <br>
					<input bind:value={cliente.password} type="password" placeholder="Escribe tu contraseña"><br>
					
					{#if editar}
					<button onclick="alert('El usuario ha sido editado correctamente')"> Editar </button>
					{:else}
					<button onclick="alert('Usuario registrado correctamente')" style = "margin-bottom:20px; margin-left:43%">
						Registrar
					</button>
					{/if}
				</form>
			</div>

			<h2> Clientes Registrados </h2>

			<div class = "cl">

				{#each usuarios as us}

					<div class = "sep">
						<h5> Nombre: {us.nombre}</h5>
						<p> Password: {us.password}</p>
						<button on:click="{editUser(us)}"> Editar </button>
						<button on:click="{deleteUser(us.id)}"> Eliminar </button>
					</div>

				{/each}

				<br>

			</div>
		</div>
	</div>
</main>

<style>
	
</style>