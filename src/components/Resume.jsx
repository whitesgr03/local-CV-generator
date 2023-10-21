import { useState, useRef, useLayoutEffect } from "react";

import Icon from "@mdi/react";
import { mdiTrashCanOutline, mdiChevronDown } from "@mdi/js";

const Resume = ({
	state,
	onDataChange,
	onDataListChange,
	onDescribeChange,
	onAddForm,
	onRemoveForm,
	onAddDescribe,
	onRemoveDescribe,
}) => {
	return (
		<div className="resume">
			<Personal personal={state.personal} onDataChange={onDataChange} />
			<Employment
				employment={state.employment}
				onAddForm={onAddForm}
				onRemoveForm={onRemoveForm}
				onAddDescribe={onAddDescribe}
				onRemoveDescribe={onRemoveDescribe}
				onDataListChange={onDataListChange}
				onDescribeChange={onDescribeChange}
			/>
			<Education
				education={state.education}
				onAddForm={onAddForm}
				onRemoveForm={onRemoveForm}
				onAddDescribe={onAddDescribe}
				onRemoveDescribe={onRemoveDescribe}
				onDataListChange={onDataListChange}
				onDescribeChange={onDescribeChange}
			/>
			<Skills skills={state.skills} onDataChange={onDataChange} />
		</div>
	);
};

const Textarea = ({
	index,
	type,
	dataId,
	describeId,
	onRemoveDescribe,
	onDescribeChange,
}) => (
	<div>
		<div className="bar">
			<p>{`Description #${index + 1}:`}</p>
			<button type="button" className="trashCan">
				<Icon
					className="icon"
					path={mdiTrashCanOutline}
					onClick={() => {
						onRemoveDescribe(type, dataId, describeId);
					}}
				/>
			</button>
		</div>
		<label>
			<textarea
				type="text"
				onChange={e =>
					onDescribeChange(type, dataId, describeId, e.target.value)
				}
			></textarea>
		</label>
	</div>
);

const Wrap = ({
	title,
	type,
	content,
	id,
	describes,
	children,
	onRemoveForm,
	onAddDescribe,
	onRemoveDescribe,
	onDescribeChange,
}) => {
	const [wrapBlockHight, setWrapBlockHight] = useState(null);
	const [displayForm, setDisplayForm] = useState(false);

	const ref = useRef(null);

	useLayoutEffect(() => {
		setWrapBlockHight(ref.current.clientHeight);
	}, [describes.length]);

	return (
		<div
			className={`wrap ${displayForm ? "pointer" : ""}`}
			onClick={() => displayForm && setDisplayForm(!displayForm)}
		>
			<div className="bar">
				<p className={`"title" ${displayForm ? "show" : ""}`}>
					{title} - {content}
				</p>
				<div className="buttonWrap">
					<button
						type="button"
						className="trashCan"
						hidden={displayForm ? true : false}
						onClick={() => {
							onRemoveForm(type, id);
						}}
					>
						<Icon className="icon " path={mdiTrashCanOutline} />
					</button>
					<button type="button" className="arrow">
						<Icon
							className="icon"
							path={mdiChevronDown}
							rotate={displayForm ? 180 : 0}
							onClick={() => setDisplayForm(!displayForm)}
						/>
					</button>
				</div>
			</div>
			<div
				className={`formWrap ${displayForm ? "hiding" : ""}`}
				style={{
					maxHeight: wrapBlockHight !== null ? wrapBlockHight : "",
				}}
			>
				<form name={type} ref={ref}>
					{children}
					<div className="describes">
						{describes.map((describe, index) => {
							return (
								<Textarea
									key={describe.id}
									index={index}
									type={type}
									dataId={id}
									describeId={describe.id}
									onRemoveDescribe={onRemoveDescribe}
									onDescribeChange={onDescribeChange}
								/>
							);
						})}
					</div>
					<button
						type="button"
						onClick={() => {
							onAddDescribe(type, id);
						}}
					>
						+ Add new describe
					</button>
				</form>
			</div>
		</div>
	);
};

const Personal = ({ personal, onDataChange }) => {
	return (
		<div className="personal">
			<h3>Personal Details</h3>
			<form name="personal">
				<label>
					FirstName
					<input
						type="text"
						name="firstName"
						onChange={e =>
							onDataChange(
								personal.type,
								e.target.name,
								e.target.value
							)
						}
					/>
				</label>
				<label>
					LastName
					<input
						type="text"
						name="lastName"
						onChange={e =>
							onDataChange(
								personal.type,
								e.target.name,
								e.target.value
							)
						}
					/>
				</label>
				<label>
					Email
					<input
						type="email"
						name="email"
						onChange={e =>
							onDataChange(
								personal.type,
								e.target.name,
								e.target.value
							)
						}
					/>
				</label>
				<label>
					Phone
					<input
						type="tel"
						name="phone"
						onChange={e =>
							onDataChange(
								personal.type,
								e.target.name,
								e.target.value
							)
						}
					/>
				</label>
				<label>
					City
					<input
						type="text"
						name="city"
						onChange={e =>
							onDataChange(
								personal.type,
								e.target.name,
								e.target.value
							)
						}
					/>
				</label>
				<label>
					State
					<input
						type="text"
						name="state"
						onChange={e =>
							onDataChange(
								personal.type,
								e.target.name,
								e.target.value
							)
						}
					/>
				</label>
			</form>
		</div>
	);
};

const Employment = ({
	employment,
	onAddForm,
	onRemoveForm,
	onAddDescribe,
	onRemoveDescribe,
	onDataListChange,
	onDescribeChange,
}) => {
	const forms = employment.dataList.map(form => {
		return (
			<Wrap
				type={employment.type}
				title={form.jobTitle}
				content={form.employer}
				id={form.id}
				key={form.id}
				describes={form.describes}
				onRemoveForm={onRemoveForm}
				onAddDescribe={onAddDescribe}
				onRemoveDescribe={onRemoveDescribe}
				onDataListChange={onDataListChange}
				onDescribeChange={onDescribeChange}
			>
				<label>
					JobTitle
					<input
						type="text"
						name="jobTitle"
						onChange={e =>
							onDataListChange(
								employment.type,
								form.id,
								e.target.name,
								e.target.value
							)
						}
					/>
				</label>
				<label>
					Employer
					<input
						type="text"
						name="employer"
						onChange={e =>
							onDataListChange(
								employment.type,
								form.id,
								e.target.name,
								e.target.value
							)
						}
					/>
				</label>
				<label>
					StartDate
					<input
						type="month"
						name="startDate"
						onChange={e =>
							onDataListChange(
								employment.type,
								form.id,
								e.target.name,
								e.target.value
							)
						}
					/>
				</label>
				<label>
					EndDate
					<input
						type="month"
						name="endDate"
						onChange={e =>
							onDataListChange(
								employment.type,
								form.id,
								e.target.name,
								e.target.value
							)
						}
					/>
				</label>
				<label>
					City
					<input
						type="text"
						name="city"
						onChange={e =>
							onDataListChange(
								employment.type,
								form.id,
								e.target.name,
								e.target.value
							)
						}
					/>
				</label>
				<label>
					State
					<input
						type="text"
						name="state"
						onChange={e =>
							onDataListChange(
								employment.type,
								form.id,
								e.target.name,
								e.target.value
							)
						}
					/>
				</label>
			</Wrap>
		);
	});

	return (
		<div className="employment">
			<h3>Employment History</h3>
			{forms}
			<button type="button" onClick={() => onAddForm(employment.type)}>
				{`+ Add ${employment.type}${
					employment.dataList.length > 1 ? " one more" : ""
				}`}
			</button>
		</div>
	);
};

const Education = ({
	education,
	onAddForm,
	onRemoveForm,
	onAddDescribe,
	onRemoveDescribe,
	onDataListChange,
	onDescribeChange,
}) => {
	const forms = education.dataList.map(form => (
		<Wrap
			type={education.type}
			title={form.school}
			content={form.degreeMajors}
			key={form.id}
			id={form.id}
			describes={form.describes}
			onRemoveForm={onRemoveForm}
			onAddDescribe={onAddDescribe}
			onRemoveDescribe={onRemoveDescribe}
			onDataListChange={onDataListChange}
			onDescribeChange={onDescribeChange}
		>
			<label>
				School
				<input
					type="text"
					name="school"
					onChange={e =>
						onDataListChange(
							education.type,
							form.id,
							e.target.name,
							e.target.value
						)
					}
				/>
			</label>
			<label>
				DegreeMajors
				<input
					type="text"
					name="degreeMajors"
					onChange={e =>
						onDataListChange(
							education.type,
							form.id,
							e.target.name,
							e.target.value
						)
					}
				/>
			</label>
			<label>
				GraduationDate
				<input
					type="month"
					name="graduationDate"
					onChange={e =>
						onDataListChange(
							education.type,
							form.id,
							e.target.name,
							e.target.value
						)
					}
				/>
			</label>
			<label>
				City
				<input
					type="text"
					name="city"
					onChange={e =>
						onDataListChange(
							education.type,
							form.id,
							e.target.name,
							e.target.value
						)
					}
				/>
			</label>
			<label>
				State
				<input
					type="text"
					name="state"
					onChange={e =>
						onDataListChange(
							education.type,
							form.id,
							e.target.name,
							e.target.value
						)
					}
				/>
			</label>
		</Wrap>
	));
	return (
		<div className="education">
			<h3>Education</h3>
			{forms}
			<button type="button" onClick={() => onAddForm(education.type)}>
				{`+ Add education${
					education.dataList.length > 1 ? " one more" : ""
				}`}
			</button>
		</div>
	);
};

const Skills = ({ skills, onDataChange }) => (
	<div className="Skills">
		<h3>Skills</h3>
		<form name="Skills">
			<label>
				<textarea
					type="text"
					name="skill"
					onChange={e =>
						onDataChange(skills.type, e.target.name, e.target.value)
					}
				></textarea>
			</label>
		</form>
	</div>
);

export default Resume;
