import { Request, Response } from "express";
import validator from "validator";
import {
  createShortUrl,
  getUrlByCode,
  getUrlAnalytics,
} from "../services/urlServices";

async function shortUrlController(req: Request, res: Response) {
  try {
    const { url, customCode } = req.body;
    const userId = (req as any).user.id;  

    if (!url) {
      return res.status(400).json({ message: "URL is required" });
    }

    if (!validator.isURL(url)) {
      return res.status(400).json({ error: "Invalid URL" });
    }

    const result = await createShortUrl(url, userId, customCode);

    return res.json({
      short_url: `http://localhost:1099/${result.shortCode}`,
    });
  } catch (error: any) {

    if (error.message === "SHORTCODE_EXISTS") {
      return res.status(400).json({
        message: "Custom URL already in use",
      });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
}

async function redirectUrlController(req: Request, res: Response) {
  try {
    const code = req.params.code;

    if (!code || Array.isArray(code)) {
      return res.status(400).json({ message: "Invalid code" });
    }

    const url = await getUrlByCode(code);

    if (!url) {
      return res.status(404).json({ message: "URL not found" });
    }

    return res.redirect(url.originalUrl);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function getUrlAnalyticsController(req: Request, res: Response) {
  try {
    const code = req.params.code;

    if (!code || Array.isArray(code)) {
      return res.status(400).json({ message: "Invalid code" });
    }

    const data = await getUrlAnalytics(code);

    if (!data) {
      return res.status(404).json({ message: "URL not found" });
    }

    return res.json({
      original_url: data.originalUrl,
      short_code: data.shortCode,
      clicks: data.clicks,
      created_at: data.createdAt,
    });

  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

export { shortUrlController, redirectUrlController, getUrlAnalyticsController };
