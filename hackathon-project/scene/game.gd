extends Node2D
var is_button_active = false
@onready var checks = Global.checks
@onready var coins = Global.coins


# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	if checks[0]:
		$TextureButton2.texture_normal=ResourceLoader.load("res://assets/check.png")
		$TextureButton2.texture_pressed=ResourceLoader.load("res://assets/check.png")
		$TextureButton2.texture_hover=ResourceLoader.load("res://assets/check.png")
	else:
		$TextureButton2.texture_normal=ResourceLoader.load("res://assets/uncheck.png")
		$TextureButton2.texture_pressed=ResourceLoader.load("res://assets/uncheck.png")
		$TextureButton2.texture_hover=ResourceLoader.load("res://assets/uncheck.png")
	if checks[1]:
		$TextureButton3.texture_normal=ResourceLoader.load("res://assets/check.png")
		$TextureButton3.texture_pressed=ResourceLoader.load("res://assets/check.png")
		$TextureButton3.texture_hover=ResourceLoader.load("res://assets/check.png")
	else:
		$TextureButton3.texture_normal=ResourceLoader.load("res://assets/uncheck.png")
		$TextureButton3.texture_pressed=ResourceLoader.load("res://assets/uncheck.png")
		$TextureButton3.texture_hover=ResourceLoader.load("res://assets/uncheck.png")


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta: float) -> void:
	pass
#var score: int = 0
@onready var score_label



func _on_texture_button_pressed() -> void:
	get_tree().change_scene_to_file("res://scene/shop.tscn")
	


func _on_texture_button_2_pressed() -> void:
	checks[0] = !checks[0]
	if checks[0]:
		$TextureButton2.texture_normal=ResourceLoader.load("res://assets/check.png")
		$TextureButton2.texture_pressed=ResourceLoader.load("res://assets/check.png")
		$TextureButton2.texture_hover=ResourceLoader.load("res://assets/check.png")
		coins[0]+=5
	else:
		$TextureButton2.texture_normal=ResourceLoader.load("res://assets/uncheck.png")
		$TextureButton2.texture_pressed=ResourceLoader.load("res://assets/uncheck.png")
		$TextureButton2.texture_hover=ResourceLoader.load("res://assets/uncheck.png")
	print (coins)
	print(checks)
	
func _on_texture_button_3_pressed() -> void:
	checks[1] = !checks[1]
	if checks[1]:
		$TextureButton3.texture_normal=ResourceLoader.load("res://assets/check.png")
		$TextureButton3.texture_pressed=ResourceLoader.load("res://assets/check.png")
		$TextureButton3.texture_hover=ResourceLoader.load("res://assets/check.png")
		coins[0]+=5
	else:
		$TextureButton3.texture_normal=ResourceLoader.load("res://assets/uncheck.png")
		$TextureButton3.texture_pressed=ResourceLoader.load("res://assets/uncheck.png")
		$TextureButton3.texture_hover=ResourceLoader.load("res://assets/uncheck.png")
	print (coins)
	print(checks)
