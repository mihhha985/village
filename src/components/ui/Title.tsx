function Title({title, subtitle}: {title: string; subtitle?: string}) {
	return ( 
		<div className="flex flex-col lg:flex-row justify-between mb-8 gap-y-4">
			<h2 className="text-4xl xl:text-5xl w-full lg:w-[40%] leading-tight">
				{title}
			</h2>
			<p className="self-end w-full lg:w-[25%] text-right">{subtitle}</p>
		</div>
	);
}

export default Title;	