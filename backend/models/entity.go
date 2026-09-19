package models

import "time"

type Entity struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	Name      string    `gorm:"type:varchar(255);not null" json:"name" binding:"required"`
	Type      string    `gorm:"type:varchar(100);not null" json:"type" binding:"required"`
	Status    string    `gorm:"type:varchar(50);not null" json:"status" binding:"required"`
	Latitude  float64   `gorm:"type:numeric(10,8);not null" json:"latitude" binding:"required"`
	Longitude float64   `gorm:"type:numeric(11,8);not null" json:"longitude" binding:"required"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}