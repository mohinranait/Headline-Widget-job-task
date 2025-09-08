"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  Copy,
  Sparkles,
  Type,
  RotateCcw,
  Palette,
  Zap,
} from "lucide-react";
import {
  DEFAULT_SETTINGS,
  DEFAULT_TEMPLATES,
  FONT_FAMILIES,
  FONT_WEIGHTS,
  UNDERLINE_STYLES,
} from "@/constans/constance";
import { IHeadlineSettings } from "@/types/style.type";

const gradientDirections = [
  { value: "to-r", label: "→ Right" },
  { value: "to-l", label: "← Left" },
  { value: "to-b", label: "↓ Down" },
  { value: "to-t", label: "↑ Up" },
];

export function HeadlineWidget() {
  // Local state
  const [settings, setSettings] = useState<IHeadlineSettings>(DEFAULT_SETTINGS);

  // Update setting for change relatime UI
  const updateSetting = (
    key: keyof IHeadlineSettings,
    value: string | boolean | number
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  // Remove all style
  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  const applyPreset = (preset: (typeof DEFAULT_TEMPLATES)[0]) => {
    setSettings((prev) => ({ ...prev, ...preset.settings }));
  };

  const getHeadlineStyle = () => {
    const baseStyle: React.CSSProperties = {
      fontSize: `${settings.fontSize}px`,
      letterSpacing: `${settings.letterSpacing}px`,
      lineHeight: settings.lineHeight,
      WebkitTextStroke: settings.textStroke
        ? `${settings.strokeWidth}px ${settings.strokeColor}`
        : "none",
      textDecoration: settings.underlineStyle !== "none" ? "underline" : "none",
      textDecorationColor: settings.underlineColor,
      textDecorationThickness: `${settings.underlineThickness}px`,
      padding: settings.backgroundHighlight
        ? `${settings.highlightPadding}px`
        : "0",
      backgroundColor: settings.backgroundHighlight
        ? settings.highlightColor
        : "transparent",
      borderRadius: settings.backgroundHighlight ? "8px" : "0",
      transition: "all 0.3s ease",
    };

    if (settings.hasGradient) {
      const gradientDirectionMap: { [key: string]: string } = {
        "to-r": "to right",
        "to-l": "to left",
        "to-b": "to bottom",
        "to-t": "to top",
      };

      const cssDirection =
        gradientDirectionMap[settings.gradientDirection] || "to right";

      return {
        ...baseStyle,
        color: "transparent",
        backgroundImage: `linear-gradient(${cssDirection}, ${settings.gradientStart}, ${settings.gradientEnd})`,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundColor: "transparent",
        textShadow: settings.textShadow
          ? "2px 2px 4px rgba(0,0,0,0.3)"
          : "none",
      };
    }

    return {
      ...baseStyle,
      color: settings.color,
      textShadow: settings.textShadow ? "2px 2px 4px rgba(0,0,0,0.3)" : "none",
    };
  };

  const renderAnimatedText = () => {
    if (!settings.perLetterAnimation) {
      return (
        <motion.h1
          key={settings.text + settings.fontSize + settings.hasGradient}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`${settings.fontFamily} ${
            settings.fontWeight
          } text-balance ${settings.hoverGlow ? "hover-glow" : ""}`}
          style={{
            ...getHeadlineStyle(),
            filter: settings.hoverGlow ? "none" : undefined,
          }}
          onMouseEnter={(e) => {
            if (settings.hoverGlow) {
              e.currentTarget.style.filter = `drop-shadow(0 0 ${settings.glowIntensity}px ${settings.glowColor})`;
            }
          }}
          onMouseLeave={(e) => {
            if (settings.hoverGlow) {
              e.currentTarget.style.filter = "none";
            }
          }}
        >
          {settings.text}
        </motion.h1>
      );
    }

    return (
      <h1
        className={`${settings.fontFamily} ${
          settings.fontWeight
        } text-balance ${settings.hoverGlow ? "hover-glow" : ""}`}
        style={{
          ...getHeadlineStyle(),
          filter: settings.hoverGlow ? "none" : undefined,
        }}
        onMouseEnter={(e) => {
          if (settings.hoverGlow) {
            e.currentTarget.style.filter = `drop-shadow(0 0 ${settings.glowIntensity}px ${settings.glowColor})`;
          }
        }}
        onMouseLeave={(e) => {
          if (settings.hoverGlow) {
            e.currentTarget.style.filter = "none";
          }
        }}
      >
        {settings.text.split("").map((char, index) => (
          <motion.span
            key={`${char}-${index}-${settings.text}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: index * settings.animationDelay,
              ease: "easeOut",
            }}
            style={{ display: "inline-block" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </h1>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
      {/* Controls Panel */}
      <div className="lg:col-span-1 space-y-4">
        <Card className="p-4 bg-sidebar border-sidebar-border">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-sidebar-foreground flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Quick Start
            </h2>
            <Button
              onClick={resetSettings}
              variant="outline"
              size="sm"
              className="border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent/10 bg-transparent"
            >
              <RotateCcw className="w-3 h-3 mr-1" />
              Reset
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {DEFAULT_TEMPLATES.map((preset, index) => (
              <Button
                key={index}
                onClick={() => applyPreset(preset)}
                variant="outline"
                size="sm"
                className="text-xs border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent/10 h-auto py-2 px-3"
              >
                {preset.name}
              </Button>
            ))}
          </div>
        </Card>

        <Card className="p-4 bg-sidebar border-sidebar-border">
          <h2 className="text-lg font-semibold  text-sidebar-foreground">
            Typography Controls
          </h2>

          <div className="space-y-3">
            <div>
              <Label
                htmlFor="headline-text"
                className="text-sidebar-foreground text-sm"
              >
                Headline Text
              </Label>
              <Input
                id="headline-text"
                value={settings.text}
                onChange={(e) => updateSetting("text", e.target.value)}
                className="mt-1 bg-input border-border text-sm"
                placeholder="Enter your headline..."
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-sidebar-foreground text-sm">
                  Font Size: {settings.fontSize}px
                </Label>
                <Slider
                  value={[settings.fontSize]}
                  onValueChange={(value) => updateSetting("fontSize", value[0])}
                  min={12}
                  max={120}
                  step={1}
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="text-sidebar-foreground text-sm">
                  Letter Spacing: {settings.letterSpacing}px
                </Label>
                <Slider
                  value={[settings.letterSpacing]}
                  onValueChange={(value) =>
                    updateSetting("letterSpacing", value[0])
                  }
                  min={-2}
                  max={10}
                  step={0.1}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-sidebar-foreground text-sm">
                  Font Family
                </Label>
                <Select
                  value={settings.fontFamily}
                  onValueChange={(value) => updateSetting("fontFamily", value)}
                >
                  <SelectTrigger className="mt-1 w-full bg-input border-border text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {FONT_FAMILIES.map((font) => (
                      <SelectItem key={font.value} value={font.value}>
                        {font.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sidebar-foreground text-sm">
                  Font Weight
                </Label>
                <Select
                  value={settings.fontWeight}
                  onValueChange={(value) => updateSetting("fontWeight", value)}
                >
                  <SelectTrigger className="mt-1 w-full bg-input border-border text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {FONT_WEIGHTS.map((weight) => (
                      <SelectItem key={weight.value} value={weight.value}>
                        {weight.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label className="text-sidebar-foreground text-sm">
                Line Height: {settings.lineHeight}
              </Label>
              <Slider
                value={[settings.lineHeight]}
                onValueChange={(value) => updateSetting("lineHeight", value[0])}
                min={0.8}
                max={2}
                step={0.1}
                className="mt-1"
              />
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-sidebar border-sidebar-border">
          <h2 className="text-lg font-semibold text-sidebar-foreground flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Color & Gradient
          </h2>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sidebar-foreground text-sm">
                Enable Gradient
              </Label>
              <Switch
                checked={settings.hasGradient}
                onCheckedChange={(checked) =>
                  updateSetting("hasGradient", checked)
                }
              />
            </div>

            {!settings.hasGradient ? (
              <div>
                <Label className="text-sidebar-foreground text-sm">
                  Text Color
                </Label>
                <div className="flex items-center gap-2 mt-1">
                  <Input
                    type="color"
                    value={settings.color}
                    onChange={(e) => updateSetting("color", e.target.value)}
                    className="w-10 h-8 p-1 border-border"
                  />
                  <Input
                    value={settings.color}
                    onChange={(e) => updateSetting("color", e.target.value)}
                    className="flex-1 bg-input border-border text-sm"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <Label className="text-sidebar-foreground text-sm">
                    Gradient Direction
                  </Label>
                  <Select
                    value={settings.gradientDirection}
                    onValueChange={(value) =>
                      updateSetting("gradientDirection", value)
                    }
                  >
                    <SelectTrigger className="mt-1 bg-input border-border text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {gradientDirections.map((direction) => (
                        <SelectItem
                          key={direction.value}
                          value={direction.value}
                        >
                          {direction.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-sidebar-foreground text-sm">
                      Start Color
                    </Label>
                    <div className="flex items-center gap-1 mt-1">
                      <Input
                        type="color"
                        value={settings.gradientStart}
                        onChange={(e) =>
                          updateSetting("gradientStart", e.target.value)
                        }
                        className="w-8 h-8 p-1 border-border"
                      />
                      <Input
                        value={settings.gradientStart}
                        onChange={(e) =>
                          updateSetting("gradientStart", e.target.value)
                        }
                        className="flex-1 bg-input border-border text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-sidebar-foreground text-sm">
                      End Color
                    </Label>
                    <div className="flex items-center gap-1 mt-1">
                      <Input
                        type="color"
                        value={settings.gradientEnd}
                        onChange={(e) =>
                          updateSetting("gradientEnd", e.target.value)
                        }
                        className="w-8 h-8 p-1 border-border"
                      />
                      <Input
                        value={settings.gradientEnd}
                        onChange={(e) =>
                          updateSetting("gradientEnd", e.target.value)
                        }
                        className="flex-1 bg-input border-border text-xs"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <Label className="text-sidebar-foreground text-sm">
                Text Shadow
              </Label>
              <Switch
                checked={settings.textShadow}
                onCheckedChange={(checked) =>
                  updateSetting("textShadow", checked)
                }
              />
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-sidebar border-sidebar-border">
          <h2 className="text-lg font-semibold mb-3 text-sidebar-foreground flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Advanced Effects
          </h2>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sidebar-foreground text-sm">
                Text Stroke
              </Label>
              <Switch
                checked={settings.textStroke}
                onCheckedChange={(checked) =>
                  updateSetting("textStroke", checked)
                }
              />
            </div>

            {settings.textStroke && (
              <div className="grid grid-cols-2 gap-3  ">
                <div>
                  <Label className="text-sidebar-foreground text-xs">
                    Width: {settings.strokeWidth}px
                  </Label>
                  <Slider
                    value={[settings.strokeWidth]}
                    onValueChange={(value) =>
                      updateSetting("strokeWidth", value[0])
                    }
                    min={0.5}
                    max={5}
                    step={0.5}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label className="text-sidebar-foreground text-xs">
                    Color
                  </Label>
                  <div className="flex items-center gap-1 mt-1">
                    <Input
                      type="color"
                      value={settings.strokeColor}
                      onChange={(e) =>
                        updateSetting("strokeColor", e.target.value)
                      }
                      className="w-6 h-6 p-0 border-border"
                    />
                    <Input
                      value={settings.strokeColor}
                      onChange={(e) =>
                        updateSetting("strokeColor", e.target.value)
                      }
                      className="flex-1 bg-input border-border text-xs"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <Label className="text-sidebar-foreground text-sm">
                Hover Glow
              </Label>
              <Switch
                checked={settings.hoverGlow}
                onCheckedChange={(checked) =>
                  updateSetting("hoverGlow", checked)
                }
              />
            </div>

            {settings.hoverGlow && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-sidebar-foreground text-xs">
                    Intensity: {settings.glowIntensity}px
                  </Label>
                  <Slider
                    value={[settings.glowIntensity]}
                    onValueChange={(value) =>
                      updateSetting("glowIntensity", value[0])
                    }
                    min={5}
                    max={30}
                    step={1}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label className="text-sidebar-foreground text-xs">
                    Color
                  </Label>
                  <div className="flex items-center gap-1 mt-1">
                    <Input
                      type="color"
                      value={settings.glowColor}
                      onChange={(e) =>
                        updateSetting("glowColor", e.target.value)
                      }
                      className="w-6 h-6 p-0 border-border"
                    />
                    <Input
                      value={settings.glowColor}
                      onChange={(e) =>
                        updateSetting("glowColor", e.target.value)
                      }
                      className="flex-1 bg-input border-border text-xs"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <Label className="text-sidebar-foreground text-sm">
                Per-Letter Animation
              </Label>
              <Switch
                checked={settings.perLetterAnimation}
                onCheckedChange={(checked) =>
                  updateSetting("perLetterAnimation", checked)
                }
              />
            </div>

            {settings.perLetterAnimation && (
              <div className="">
                <Label className="text-sidebar-foreground text-xs">
                  Animation Delay: {settings.animationDelay}s
                </Label>
                <Slider
                  value={[settings.animationDelay]}
                  onValueChange={(value) =>
                    updateSetting("animationDelay", value[0])
                  }
                  min={0.05}
                  max={0.3}
                  step={0.05}
                  className="mt-1"
                />
              </div>
            )}
          </div>
        </Card>

        <Card className="p-4 bg-sidebar border-sidebar-border">
          <h2 className="text-lg font-semibold mb-3 text-sidebar-foreground flex items-center gap-2">
            <Type className="w-4 h-4" />
            Word Styling
          </h2>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sidebar-foreground text-sm">
                Background Highlight
              </Label>
              <Switch
                checked={settings.backgroundHighlight}
                onCheckedChange={(checked) =>
                  updateSetting("backgroundHighlight", checked)
                }
              />
            </div>

            {settings.backgroundHighlight && (
              <div className="grid grid-cols-2 gap-3 ">
                <div>
                  <Label className="text-sidebar-foreground text-xs">
                    Color
                  </Label>
                  <div className="flex items-center gap-1 mt-1">
                    <Input
                      type="color"
                      value={settings.highlightColor}
                      onChange={(e) =>
                        updateSetting("highlightColor", e.target.value)
                      }
                      className="w-6 h-6 p-0 border-border"
                    />
                    <Input
                      value={settings.highlightColor}
                      onChange={(e) =>
                        updateSetting("highlightColor", e.target.value)
                      }
                      className="flex-1 bg-input border-border text-xs"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-sidebar-foreground text-xs">
                    Padding: {settings.highlightPadding}px
                  </Label>
                  <Slider
                    value={[settings.highlightPadding]}
                    onValueChange={(value) =>
                      updateSetting("highlightPadding", value[0])
                    }
                    min={4}
                    max={20}
                    step={2}
                    className="mt-1"
                  />
                </div>
              </div>
            )}

            <div>
              <Label className="text-sidebar-foreground text-sm">
                Underline Style
              </Label>
              <Select
                value={settings.underlineStyle}
                onValueChange={(value) =>
                  updateSetting("underlineStyle", value)
                }
              >
                <SelectTrigger className="mt-1 w-full bg-input border-border text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {UNDERLINE_STYLES.map((style) => (
                    <SelectItem key={style.value} value={style.value}>
                      {style.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {settings.underlineStyle !== "none" && (
              <div className="grid grid-cols-2 gap-3 ">
                <div>
                  <Label className="text-sidebar-foreground text-xs">
                    Color
                  </Label>
                  <div className="flex items-center gap-1 mt-1">
                    <Input
                      type="color"
                      value={settings.underlineColor}
                      onChange={(e) =>
                        updateSetting("underlineColor", e.target.value)
                      }
                      className="w-6 h-6 p-0 border-border"
                    />
                    <Input
                      value={settings.underlineColor}
                      onChange={(e) =>
                        updateSetting("underlineColor", e.target.value)
                      }
                      className="flex-1 bg-input border-border text-xs"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-sidebar-foreground text-xs">
                    Thickness: {settings.underlineThickness}px
                  </Label>
                  <Slider
                    value={[settings.underlineThickness]}
                    onValueChange={(value) =>
                      updateSetting("underlineThickness", value[0])
                    }
                    min={1}
                    max={8}
                    step={1}
                    className="mt-1"
                  />
                </div>
              </div>
            )}
          </div>
        </Card>

        <Card className="p-4 bg-sidebar border-sidebar-border">
          <h2 className="text-lg font-semibold mb-3 text-sidebar-foreground">
            Export
          </h2>

          <div className="space-y-2">
            <Button className="w-full bg-sidebar-accent hover:bg-sidebar-accent/90 text-sidebar-accent-foreground text-sm">
              <Download className="w-3 h-3 mr-2" />
              Export JSON
            </Button>
            <Button
              variant="outline"
              className="w-full border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent/10 bg-transparent text-sm"
            >
              <Copy className="w-3 h-3 mr-2" />
              Copy CSS & HTML
            </Button>
          </div>
        </Card>
      </div>

      {/* Preview Area */}
      <div className="lg:col-span-2 ">
        <Card className="p-6 top-0 sticky bg-card border-border min-h-[600px] flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-card-foreground">
              Live Preview
            </h2>
            <div className="flex gap-2">
              {settings.hasGradient && (
                <Badge variant="secondary" className="text-xs">
                  Gradient
                </Badge>
              )}
              {settings.textStroke && (
                <Badge variant="secondary" className="text-xs">
                  Stroke
                </Badge>
              )}
              {settings.hoverGlow && (
                <Badge variant="secondary" className="text-xs">
                  Glow
                </Badge>
              )}
              {settings.perLetterAnimation && (
                <Badge variant="secondary" className="text-xs">
                  Animation
                </Badge>
              )}
              {settings.backgroundHighlight && (
                <Badge variant="secondary" className="text-xs">
                  Highlight
                </Badge>
              )}
              {settings.underlineStyle !== "none" && (
                <Badge variant="secondary" className="text-xs">
                  Underline
                </Badge>
              )}
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <div className="text-center max-w-full">{renderAnimatedText()}</div>
          </div>

          <div className="mt-6 pt-4 border-t border-border">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-muted-foreground">
              <div>
                <span className="font-medium">Font:</span>{" "}
                {
                  FONT_FAMILIES.find((f) => f.value === settings.fontFamily)
                    ?.label
                }
              </div>
              <div>
                <span className="font-medium">Size:</span> {settings.fontSize}px
              </div>
              <div>
                <span className="font-medium">Weight:</span>{" "}
                {
                  FONT_WEIGHTS.find((w) => w.value === settings.fontWeight)
                    ?.label
                }
              </div>
              <div>
                <span className="font-medium">Spacing:</span>{" "}
                {settings.letterSpacing}px
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
