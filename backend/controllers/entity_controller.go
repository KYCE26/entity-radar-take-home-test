package controllers

import (
	"backend/config"
	"backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetEntities(c *gin.Context) {
	var entities []models.Entity
	config.DB.Find(&entities)
	c.JSON(http.StatusOK, entities)
}

func GetEntity(c *gin.Context) {
	var entity models.Entity
	if err := config.DB.First(&entity, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Entitas tidak ditemukan"})
		return
	}
	c.JSON(http.StatusOK, entity)
}

func CreateEntity(c *gin.Context) {
	var input models.Entity
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if input.Latitude < -90 || input.Latitude > 90 || input.Longitude < -180 || input.Longitude > 180 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Titik koordinat tidak valid"})
		return
	}

	config.DB.Create(&input)
	c.JSON(http.StatusCreated, input)
}

func UpdateEntity(c *gin.Context) {
	var entity models.Entity
	if err := config.DB.First(&entity, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Entitas tidak ditemukan"})
		return
	}

	var input models.Entity
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if input.Latitude < -90 || input.Latitude > 90 || input.Longitude < -180 || input.Longitude > 180 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Titik koordinat tidak valid"})
		return
	}

	config.DB.Model(&entity).Updates(input)
	c.JSON(http.StatusOK, entity)
}

func DeleteEntity(c *gin.Context) {
	var entity models.Entity
	if err := config.DB.First(&entity, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Entitas tidak ditemukan"})
		return
	}
	config.DB.Delete(&entity)
	c.JSON(http.StatusOK, gin.H{"message": "Entitas berhasil dihapus"})
}