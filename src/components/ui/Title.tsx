type TitleVariant = "sm" | "lg" | "xl"

function Title({title, subtitle, variant = "sm"}: {title: string; subtitle: string, variant?: TitleVariant}) {
	return ( 
		<div className="flex flex-col lg:flex-row justify-between mb-8 gap-y-4">
			<h2 className="text-4xl xl:text-5xl w-full lg:w-[40%] leading-tight">
				{title}
			</h2>
			<p className={`self-end w-full text-right 
				${variant === "sm" && "lg:w-1/4"}
				${variant === "lg" &&	 "lg:w-1/3"}
				${variant === "xl" && "lg:w-1/2"}
			`}>
				{subtitle}
			</p>
		</div>
	);
}

export default Title;	