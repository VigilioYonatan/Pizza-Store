import { Request, Response } from "express";

export async function error404(req: Request, res: Response) {
	if (req.path.includes("/api")) {
		return res.status(404).json({
			error: 404,
			success: false,
			message: "This endpoint is not correct",
		});
	}
	if (req.path.includes("/admin")) {
		res.status(404);
		res.render("admin/404");
		return;
	}
	res.status(404);
	res.render("web/404");
}
