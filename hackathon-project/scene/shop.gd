extends Node2D
@onready var checks = Global.checks
@onready var coins = Global.coins
@onready var shop = Global.shop
@onready var animated_sprite = $AnimatedSprite2D



# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	animated_sprite = $AnimatedSprite2D
	print(animated_sprite)
	if shop[1]:
		$hair.texture_normal=ResourceLoader.load("res://assets/bought.png")
		$hair.texture_pressed=ResourceLoader.load("res://assets/bought.png")
		$hair.texture_hover=ResourceLoader.load("res://assets/bought.png")
		print(coins)
	else:
		$hair.texture_normal=ResourceLoader.load("res://assets/buy.png")
		$hair.texture_pressed=ResourceLoader.load("res://assets/buy.png")
		$hair.texture_hover=ResourceLoader.load("res://assets/buy.png")


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta: float) -> void:
	pass


func _on_texture_button_pressed() -> void:
	get_tree().change_scene_to_file("res://scene/game.tscn")
	
func _on_hair_pressed() -> void:
	shop[0] = !shop[0]
	if shop[0]:
		if(coins[0]<8&&!shop[1]):
			print("You can't buy this.")
			shop[0] = !shop[0]
		else:
			$hair.texture_normal=ResourceLoader.load("res://assets/bought.png")
			$hair.texture_pressed=ResourceLoader.load("res://assets/bought.png")
			$hair.texture_hover=ResourceLoader.load("res://assets/bought.png")
			coins[0]-=8
			if(shop[1]):
				coins[0]+=8
			shop[1] = true
			print(coins)
			print("Sry, character mods are currently inaccessible")
			#character.setAnimation("withHair");
			##animated_sprite.play("hair")
